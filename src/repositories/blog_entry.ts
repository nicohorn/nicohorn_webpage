import { BlogEntryWithTagsForm } from "@/app/[lang]/dashboard/blog_entry/components/BlogEntryForm";
import { prisma } from "@/utils/db";
import { Prisma } from "@prisma/client";

//This type is for the frontend. I have yet to investigate a little more of this.
export type BlogEntryWithTags = Prisma.blog_entriesGetPayload<{
  include: {
    tags: {
      include: {
        blog_tag: true;
      };
    };
  };
}>;

export const getBlogEntryById = async (id: string) => {
  try {
    const blog_entry = await prisma.blog_entries.findUnique({
      where: {
        id,
      },
      include: {
        tags: {
          include: {
            blog_tag: true,
          },
        },
      },
    });
    return blog_entry;
  } catch (error) {
    return null;
  }
};

export const createBlogEntry = async (data: BlogEntryWithTagsForm) => {
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
                  id: tag.id,
                },
              },
            };
          }),
        },
      },
    });

    return blog_entry;
  } catch (error) {
    return null;
  }
};

export const updateBlogEntry = async (
  id: string,
  data: BlogEntryWithTagsForm,
) => {
  try {
    const blog_entry = await getBlogEntryById(id);
    const blog_entry_updated = await prisma.blog_entries.update({
      data: {
        ...data,
        created_at: blog_entry?.created_at,
        edited_at: new Date(),
        tags: {
          connectOrCreate: data.tags.map((tag) => ({
            where: {
              blog_entry_id_blog_tag_id: {
                blog_entry_id: id,
                blog_tag_id: tag.id,
              },
            },
            create: {
              blog_tag: {
                connect: { id: tag.id },
              },
            },
          })),
        },
      },
      where: {
        id,
      },
    });
    return blog_entry_updated;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllBlogEntriesWithTags = async (tag: string, lang: string) => {
  try {
    const blog_entries = await prisma.blog_entries.findMany({
      where: {
        tags: {
          some: {
            blog_tag: {
              name: {
                contains: tag,
              },
            },
          },
        },
        lang: {
          equals: lang,
        },
      },
      include: {
        tags: {
          include: {
            blog_tag: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return blog_entries;
  } catch (error) {
    return null;
  }
};

export const getLatest3BlogEntries = async (lang: string) => {
  try {
    const blog_entries = await prisma.blog_entries.findMany({
      where: {
        lang: {
          equals: lang,
        },
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        tags: {
          include: {
            blog_tag: true,
          },
        },
      },

      take: 3,
    });
    return blog_entries;
  } catch (e) {
    return null;
  }
};
