import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'devlog'>;

/** Alle Projekte, sortiert nach "order" */
export async function getProjects() {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Das Projekt mit spotlight: true (oder das erste) */
export async function getSpotlight() {
  const all = await getProjects();
  return all.find((p) => p.data.spotlight) ?? all[0];
}

/** Langtext eines Projekts in einer Sprache, falls vorhanden */
export async function getProjectText(id: string, lang: Lang) {
  const texts = await getCollection('projectTexts');
  return texts.find((t) => t.id === `${id}/${lang}`);
}

/** Devlog-Beiträge einer Sprache, neueste zuerst, ohne Entwürfe */
export async function getPosts(lang: Lang) {
  const all = await getCollection('devlog', (p) => p.id.endsWith(`/${lang}`) && !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Ordnername eines Beitrags, z. B. "2026-10-retargeting" */
export const postSlug = (post: Post) => post.id.split('/')[0];

/** Gibt es den Beitrag auch in der anderen Sprache? */
export async function hasTranslation(slug: string, lang: Lang) {
  const posts = await getCollection('devlog');
  return posts.some((p) => p.id === `${slug}/${lang}` && !p.data.draft);
}
