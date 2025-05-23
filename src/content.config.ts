import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";


const blog = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "src/data/blog"}),
    schema: z.object({
        id: z.string(),
        date: z.coerce.date(),
        title: z.string(),
        description: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        banner: z.string(),
        locale: z.enum(['en', 'es']),
    })
})

export const collections = { blog }