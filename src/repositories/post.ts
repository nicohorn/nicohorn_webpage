import { prisma } from "@/utils/db"
import { users, Post } from "@prisma/client"

export const getPostsById = async (user_id: string) => {
    try {

        console.log("USER ID", user_id)
        const user = await prisma.post.findMany({
            where: {
                author_id: user_id
            }
        })
        return user
    } catch (error) {
        return null;
    }
}


export const createPost = async (data: Omit<Post, "id">) => {
    try {

        const post = await prisma.post.create({
            data,
        })
        return post
    } catch (error) {

        return null
    }
}