import de from '../i18n/de.yaml';
import en from '../i18n/en.yaml';

export const languages = ['de', 'en'] as const;
export type Lang = (typeof languages)[number];
export type Localized = { de: string; en: string };

const dictionaries: Record<Lang, any> = { de, en };

/** Prüft beim Build, dass de.yaml und en.yaml dieselben Schlüssel haben. */
function compare(a: any, b: any, path: string, out: string[]) {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return out.push(`${path} (Liste nur in einer Sprache)`);
    if (a.length !== b.length) out.push(`${path} (DE hat ${a.length}, EN hat ${b.length} Einträge)`);
    a.forEach((v, i) => b[i] !== undefined && compare(v, b[i], `${path}[${i}]`, out));
    return;
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') return out.push(path);
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!(k in a)) out.push(`de.yaml fehlt: ${path ? path + '.' : ''}${k}`);
      else if (!(k in b)) out.push(`en.yaml fehlt: ${path ? path + '.' : ''}${k}`);
      else compare(a[k], b[k], path ? `${path}.${k}` : k, out);
    }
  }
}
const problems: string[] = [];
compare(de, en, '', problems);
if (problems.length) {
  throw new Error('Übersetzungen passen nicht zusammen:\n  ' + problems.join('\n  '));
}

/** Alle Texte einer Sprache, z. B. t.home.hero_title */
export function useTexts(lang: Lang) {
  return dictionaries[lang];
}

/** Wählt die passende Sprache aus einem { de, en }-Feld oder gibt einen einfachen Text zurück. */
export function pick(value: Localized | string | undefined, lang: Lang): string {
  if (value === undefined) return '';
  return typeof value === 'string' ? value : value[lang];
}

/** Ersetzt {name} in einem Text, z. B. "{n} Projekte" */
export function fill(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ''));
}

export const otherLang = (lang: Lang): Lang => (lang === 'de' ? 'en' : 'de');

/** Link innerhalb einer Sprache: url('de', 'projects/') → /de/projects/ */
export const url = (lang: Lang, path = '') => `/${lang}/${path}`;

export const langPaths = () => languages.map((lang) => ({ params: { lang } }));

export function formatDate(date: Date, lang: Lang) {
  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { month: 'short', year: 'numeric' });
}
