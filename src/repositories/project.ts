import { prisma } from "@/utils/db"


export const getAllProjects = async () => {
    try {
        const projects = await prisma.projects.findMany({})
        return projects
    } catch (e) {
        return null;
    }

}