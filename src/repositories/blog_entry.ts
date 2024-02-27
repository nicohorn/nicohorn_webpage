import { BlogEntryWithTags } from "@/app/dashboard/new_entry/components/BlogEntryForm";
import { prisma } from "@/utils/db";

export const getBlogEntryById = async (id: string) => {
  try {
    const blog_entry = await prisma.blog_entries.findUnique({
      where: {
        id,
      },
    });
    return blog_entry;
  } catch (error) {
    return null;
  }
};

export const createBlogEntry = async (data: BlogEntryWithTags) => {
  try {
    const blog_entries = await prisma.blog_entries.create({
      data: {
        ...data,
        created_at: new Date(),
        edited_at: new Date(),
        tags: {
          create: data.tags.map((tag) => {
            return {
              blog_tag: {
                connect: {
                  id: tag.id,
                },
              },
            };
          }),
        },
      },
    });

    return blog_entries;
  } catch (error) {

    return null;
  }
};

export const getAllBlogEntriesWithTags = async (tag: string) => {

  try {
    console.log("SEARCH PARAMS", tag)
    const blog_entries = await prisma.blog_entries.findMany({
      where: {
        tags: {
          some: {
            blog_tag: {
              name: {
                contains: tag
              }
            }
          }
        }
      },
      include: {
        tags: {
          include: {
            blog_tag: true,
          },
        },

      },
      orderBy: {
        created_at: "desc"

      }
    });
    return blog_entries;
  } catch (error) {
    return null;
  }
};