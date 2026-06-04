import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(['sims-4', 'simlit', 'cc-mods', 'gaming', 'behind-the-story']),
    coverImage: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { blog };
