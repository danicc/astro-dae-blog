import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    banner: z.string(),
    locale: z.enum(["en", "es"]),
  }),
});

const companies = defineCollection({
    loader: file("src/content/companies.json"),
    schema: z.object({
        id: z.number(),
        name: z.string(),
        website: z.string(),
        image: z.string(),
    })
})

export const collections = { blog, companies };
