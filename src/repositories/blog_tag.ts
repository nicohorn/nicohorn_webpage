import { prisma } from "@/utils/db"
import { users, blog_tags } from "@prisma/client"


export const getTags = async () => {
    try {

        const tags = await prisma.blog_tags.findMany({

            orderBy: {
                name: "asc"
            }
        })
        return tags
    } catch (error) {
        return null;
    }
}

export const newTag = async (data: Omit<blog_tags, "id">) => {
    try {
        const newTag = await prisma.blog_tags.create({
            data
        })

        return newTag;
    }
    catch (error) {

        return error;
    }
}