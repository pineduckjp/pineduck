// src/content.config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const rectSchema = z.object({
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
});

const frameSchema = z.object({
  frame: rectSchema,
  rotated: z.boolean().optional(),
  trimmed: z.boolean().optional(),
  spriteSourceSize: rectSchema.optional(),
  sourceSize: z
    .object({
      w: z.number(),
      h: z.number(),
    })
    .optional(),
  duration: z.number(),
});

const frameTagSchema = z.object({
  name: z.string(),
  from: z.number(),
  to: z.number(),
  direction: z.string().optional(),
  color: z.string().optional(),
});

const spriteSchema = z.object({
  frames: z.record(z.string(), frameSchema),
  meta: z.object({
    app: z.string().optional(),
    version: z.string().optional(),
    image: z.string(),
    format: z.string().optional(),
    size: z.object({
      w: z.number(),
      h: z.number(),
    }),
    scale: z.string().optional(),
    frameTags: z.array(frameTagSchema).default([]),
  }),
});

const spritesStatic = defineCollection({
  loader: glob({
    pattern: "*.json",
    base: "src/content/sprites/static",
  }),
  schema: spriteSchema,
});

const spritesDynamic = defineCollection({
  loader: glob({
    pattern: "*.json",
    base: "src/content/sprites/dynamic",
  }),
  schema: spriteSchema,
});

export const collections = {
  spritesStatic,
  spritesDynamic,
};
