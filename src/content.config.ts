import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    publish_at: z.coerce.date(),
    hero_image: z.string().optional(),
    linkedin_url: z.string().url().optional().or(z.literal("")),
    status: z.enum(["draft", "scheduled", "published"]).default("scheduled"),
    ai_generated: z.boolean().default(false),
    ai_generated_at: z.coerce.date().optional(),
    social_summary: z.string().optional(),
  }),
});

export const collections = { blog };
