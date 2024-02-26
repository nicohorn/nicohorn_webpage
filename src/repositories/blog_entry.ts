import { BlogEntryWithTags } from "@/app/dashboard/new_entry/components/BlogEntryForm"
import { prisma } from "@/utils/db"
import { blog_entries } from "@prisma/client"


export const createBlogEntry = async (data: BlogEntryWithTags) => {
    try {




        const blog_entry = await prisma.blog_entries.create({
            data: {
                ...data,
                created_at: new Date(),
                edited_at: new Date(),
                tags: {
                    create: data.tags.map((tag) => {
                        return {
                            blog_tag: {
                                connect: {
                                    id: tag.id
                                }
                            }
                        }
                    })
                },


            },
        })
        console.log("prisma createBlogEntry", blog_entry)
        return blog_entry
    } catch (error) {
        console.log(error)
        return null
    }
}