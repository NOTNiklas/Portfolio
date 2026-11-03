// ─────────────────────────────────────────────────────────────
// Regeln für alle Inhalte. Fehlt ein Pflichtfeld oder hat es einen
// ungültigen Wert, bricht der Build mit einer klaren Meldung ab.
// ─────────────────────────────────────────────────────────────
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Ein Text in beiden Sprachen */
const L = z.object({ de: z.string(), en: z.string() }).strict();

/** Ein Bild oder Video (Pfad unter public/), leer = Platzhalter */
const media = z.string().default('');

const projects = defineCollection({
  // Eine project.yaml pro Projektordner. Die ID ist der Ordnername.
  loader: glob({
    pattern: '*/project.yaml',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    spotlight: z.boolean().default(false),
    featured: z.boolean().default(false),
    year: z.number().int(),
    status: z.enum(['released', 'in-development', 'prototype', 'jam']),
    engine: z.string(),
    filters: z.array(z.enum(['unreal', 'godot', 'jam', 'tool'])),
    tags: z.array(z.string()),
    type: L,
    role: L,
    summary: L,
    tagline: L.optional(),
    intro: L.optional(),
    cover: media,
    keyArt: media,
    trailer: media,
    extraFacts: z.array(z.object({ label: L, value: L })).default([]),
    links: z.array(z.object({ label: L, url: z.string() })).default([]),
    loop: z
      .object({ heading: L, text: L, steps: z.array(L) })
      .optional(),
    features: z.array(z.object({ title: L, text: L, media })).default([]),
    art: z
      .object({
        heading: L,
        text: L,
        palette: z.array(z.object({ name: L, hex: z.string().regex(/^#[0-9a-fA-F]{6}$/) })).default([]),
        concepts: z.array(z.object({ caption: L, src: media })).default([]),
      })
      .optional(),
    gallery: z.array(z.object({ caption: L, src: media })).default([]),
    tech: z.array(z.object({ title: L, text: L })).default([]),
    learnings: z.object({ heading: L, items: z.array(z.object({ title: L, text: L })) }).optional(),
  }),
});

const projectTexts = defineCollection({
  // Optionaler Langtext pro Projekt und Sprache: projects/<id>/de.md und en.md
  loader: glob({
    pattern: '*/{de,en}.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    heading: z.string(),
  }),
});

const devlog = defineCollection({
  // Ein Ordner pro Beitrag, darin de.md und/oder en.md
  loader: glob({
    pattern: '*/{de,en}.md',
    base: './src/content/devlog',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['kintsugi', 'tools', 'tutorial', 'postmortem']),
    readingTime: z.number().int().positive(),
    excerpt: z.string(),
    cover: media,
    draft: z.boolean().default(false),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { projects, projectTexts, devlog, legal };
