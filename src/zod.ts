import { z } from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
    z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);


export const BlogEntrySchema = z.object({
    title: z.string().min(5, { message: "Title must have at least 5 characters" }),
    description: z.string().min(50, { message: "Description must have at least 50 characters" }),
    content: z.string(),
    cover_image: z.string(),
    tags: z.array(z.object({ id: z.string(), name: z.string() })).min(1, { message: "At least one tag must be selected" }),
    node: z.string().nullable(),
    author_name: z.string(),
    author_id: z.string(),
    lang: z.string()

    /**Sadly, Prisma doesn't support multi schema table relations. I have my users in the next-auth schema and all tables regarding the blog in the public schema. I'm saving the data like this because I don't have any other options for now. Maybe at some point I'll migrate to another ORM that supports this */


})


/**Blog entry Zod type */
export type BlogEntry = z.infer<typeof BlogEntrySchema>

