import { prisma } from "@/utils/db"
import { users } from "@prisma/client"




export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error) {

        return null;
    }
}


export const getUserById = async (id: string) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id
            }
        })
        return user
    } catch (error) {

        return null;
    }
}

export const updateUserByEmail = async (email: string, data: users) => {
    try {
        const user = await prisma.users.update({
            where: {
                email,
            },
            data,
        })
        return user
    } catch (error) {
        return null
    }
}