// Lädt die Dateien aus src/data/ und prüft sie beim Build.
import { z } from 'astro/zod';
import siteRaw from '../data/site.yaml';
import legalRaw from '../data/legal.yaml';
import timelineRaw from '../data/timeline.yaml';
import skillsRaw from '../data/skills.yaml';
import aboutRaw from '../data/about.yaml';

const L = z.object({ de: z.string(), en: z.string() }).strict();

function parse<T extends z.ZodType>(schema: T, data: unknown, file: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Fehler in src/data/${file}:\n${issues}`);
  }
  return result.data;
}

export const site = parse(
  z.object({
    name: z.string(),
    email: z.string().email(),
    location: L,
    startedYear: z.number().int(),
    availability: z.object({ open: z.boolean(), text: L, from: L }),
    socials: z.array(z.object({ label: z.string(), url: z.string().url() })),
    cv: L,
    showreel: z.object({ video: z.string().default(''), poster: z.string().default('') }),
    portrait: z.string().default(''),
    contactFormAction: z.string().default(''),
    newsletterAction: z.string().default(''),
  }),
  siteRaw,
  'site.yaml',
);

export const legal = parse(
  z.object({
    name: z.string(),
    street: z.string(),
    zip: z.string(),
    city: z.string(),
    country: z.string(),
    email: z.string().email(),
    phone: z.string().default(''),
    updated: z.string(),
  }),
  legalRaw,
  'legal.yaml',
);

export const timeline = parse(
  z.array(
    z.object({
      when: L,
      kind: z.enum(['project', 'work', 'jam', 'education', 'tool']),
      current: z.boolean().default(false),
      title: L,
      text: L,
    }),
  ),
  timelineRaw,
  'timeline.yaml',
);

export const skills = parse(
  z.object({
    groups: z.array(z.object({ title: L, items: z.array(z.union([z.string(), L])) })),
    languages: L,
    courses: L,
  }),
  skillsRaw,
  'skills.yaml',
);

export const about = parse(
  z.object({
    facts: z.array(z.object({ label: L, value: L })),
    games: z.array(z.object({ title: z.string(), cover: z.string().default(''), why: L })),
    hobbies: z.array(z.object({ title: L, image: z.string().default(''), text: L })),
  }),
  aboutRaw,
  'about.yaml',
);
