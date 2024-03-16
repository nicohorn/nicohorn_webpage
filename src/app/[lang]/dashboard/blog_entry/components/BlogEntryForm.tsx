/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Title from "@/components/Title";
import TextEditor from "../components/TextEditor";
import { blog_entries, blog_tags } from "@prisma/client";
import { useForm, zodResolver } from "@mantine/form";
import { BlogEntry, BlogEntrySchema } from "@/zod";
import { PrismaClientErrors } from "@/utils/dictionaries/PrismaClientErrors";
import { supabase } from "@/supabase";
import { Notification } from "@/components/Notification";
import { useRouter } from "next/navigation";
import { BlogEntryWithTags, updateBlogEntry } from "@/repositories/blog_entry";

//Had to create these two types here to make the createBlogEntry parameter type more readable.
type BlogEntryWithoutIdCreatedAt = Omit<
  blog_entries,
  "id" | "edited_at" | "created_at"
>;
export type BlogEntryWithTagsForm = BlogEntryWithoutIdCreatedAt & {
  tags: { id: string; name: string }[];
};

export default function BlogEntryForm({
  tags,
  lang,
  blog_entry,
}: {
  tags: blog_tags[];
  lang: string;
  blog_entry?: BlogEntryWithTags;
}) {
  const blog_title = useRef<HTMLInputElement>(null);
  const blog_description = useRef<HTMLTextAreaElement>(null);
  const blog_entry_cover_image_input = useRef<HTMLInputElement>(null);
  const [blog_entry_cover_image, setBlogEntryCoverImage] = useState<string>();
  const blog_entry_new_tag = useRef<HTMLInputElement>(null);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [blog_entry_content, setContent] = useState<string>(
    blog_entry?.content || "<h1>Hello world!</h1>"
  );
  const [tagList, setTagList] = useState(tags);
  const [selectedTags, setSelectedTags] = useState<
    { id: string; name: string }[]
  >([]);

  const getLoggedInUser = async () => {
    const res = await fetch(`/api/auth/session`);
    return res.json().then((res) => {
      return { user: res.user, id: res.user.id };
    });
  };

  const router = useRouter();

  const form = useForm<BlogEntry>({
    validate: zodResolver(BlogEntrySchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  useEffect(() => {
    if (blog_entry) {
      form.setValues({
        title: blog_entry.title,
        description: blog_entry.description,
      });
      setBlogEntryCoverImage(blog_entry.cover_image);
      const transformedTags = blog_entry!.tags.map(({ blog_tag }) => blog_tag);
      setSelectedTags(transformedTags);
    }
  }, [blog_entry]);

  const createBlogEntry = async (blog_entry: BlogEntryWithTagsForm) => {
    const res = await fetch("/api/blog_entry", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(blog_entry),
    });

    if (res.status == 200) {
      new Notification().props({
        type: "success",
        title: "New blog entry created",
        description: "Created new blog entry. Redirecting...",
        seconds: 4,
      });

      setTimeout(() => {
        router.push(`/${lang}/blog`);
      }, 2000);

      return res.json();
    } else {
      new Notification().props({
        type: "error",
        title: "Erro creating blog post",
        description: "Couldn't create blog post. An error ocurred.",
        seconds: 4,
      });
    }
  };

  const updateBlogEntry = async (
    id: string,
    blog_entry: BlogEntryWithTagsForm
  ) => {
    const res = await fetch("/api/blog_entry", {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ id, blog_entry }),
    });

    if (res.status == 200) {
      new Notification().props({
        type: "success",
        title: "Blog entry updated",
        description: "The entry was successfully updated. Redirecting...",
        seconds: 4,
      });

      setTimeout(() => {
        router.push(`/${lang}/blog`);
      }, 2000);

      return res.json();
    } else {
      new Notification().props({
        type: "error",
        title: "Erro updating blog entry",
        description: "Couldn't update blog entry. An error ocurred.",
        seconds: 4,
      });
    }
  };

  const newTag = async (tag: Omit<blog_tags, "id">) => {
    const res = await fetch("/api/tag", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(tag),
    });

    if (res) {
      console.log("new tag res", res);
      return res.json();
    } else {
      console.log("Error creating tag");
    }
  };

  return (
    <form className="xl:w-[50%] flex flex-col gap-4">
      <Title title="Entrada de blog" />
      <div className="flex flex-col gap-1">
        <label htmlFor="blog_entry_title">Título</label>
        <input
          value={""}
          id="blog_entry_title"
          ref={blog_title}
          className="bg-black border border-zinc-600 focus:border-b-white transition px-2 h-14  outline-none text-4xl"
          //== hw => fix the warning "A component is changing an uncontrolled input to be controlled" https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
          {...form.getInputProps("title")}
        />
        {form.getInputProps("title").error && (
          <p className=" pl-3 pt-1 text-xs text-gray-600 saturate-[80%]">
            *{form.getInputProps("title").error}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="blog_entry_description">Descripción corta</label>
        <textarea
          {...form.getInputProps("description")}
          id="blog_entry_description"
          ref={blog_description}
          rows={4}
          className="bg-black border border-zinc-600 focus:border-b-white  px-2 py-1 outline-none"
        />
        {form.getInputProps("description").error && (
          <p className=" pl-3 pt-1 text-xs text-gray-600 saturate-[80%]">
            *{form.getInputProps("description").error}
          </p>
        )}
      </div>
      <div className="flex gap-5">
        <label
          htmlFor="blog_entry_cover_image"
          className="h-fit flex-grow self-center p-2 text-center border border-zinc-600 bg-zinc-900 cursor-pointer hover:bg-white hover:text-black transition"
        >
          Imagen de portada
        </label>
        <input
          onChange={async () => {
            //Image file from the input.
            const image = blog_entry_cover_image_input?.current?.files![0];

            //Now upload it to the storage bucket from supabase.
            const { data, error } = await supabase.storage
              .from("nicohorn_website")
              .upload(`blog_images/${image?.name}`, image!, {
                cacheControl: "3600",
                upsert: false,
              });

            const blog_entry_cover_image_src =
              process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL! + data?.path;

            if (data) setBlogEntryCoverImage(blog_entry_cover_image_src);
            else
              new Notification().props({
                type: "error",
                title: "Error uploading image",
                description: error.message,
                seconds: 4,
              });
          }}
          ref={blog_entry_cover_image_input}
          className="hidden"
          id="blog_entry_cover_image"
          type="file"
        ></input>
        <div className={blog_entry_cover_image ? "w-40 relative " : "hidden"}>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const imageName = blog_entry_cover_image?.split("/").at(-1);
              console.log(imageName);
              const { data, error } = await supabase.storage
                .from("nicohorn_website")
                .remove([`blog_images/${imageName}`]);

              if (data) setBlogEntryCoverImage(undefined);
              else console.log(error);
            }}
            className="bg-white rounded-full w-6 -right-1 -top-1 text-center pb-1 absolute text-black opacity-50 hover:opacity-100 transition"
          >
            x
          </button>
          <img alt="Blog entry cover image" src={blog_entry_cover_image}></img>
        </div>
      </div>
      <div className="flex flex-col gap-1 ">
        <p>Tags</p>
        <div className="flex gap-2 flex-wrap">
          {tagList.map((tag, idx) => {
            const isTagSelected = selectedTags.some(
              (selectedTag) => selectedTag.name === tag.name
            );

            return (
              <button
                onClick={(e) => {
                  e.preventDefault();

                  if (!isTagSelected) {
                    setSelectedTags([...selectedTags, tag]);
                  } else {
                    setSelectedTags([
                      ...selectedTags.filter(
                        (selectedTag) => selectedTag.name !== tag.name
                      ),
                    ]);
                  }
                }}
                className={`${
                  isTagSelected
                    ? "text-white"
                    : "text-zinc-600 border-zinc-600 hover:border-zinc-400 hover:text-zinc-400"
                } border px-2 py-1 rounded-md cursor-pointer`}
                key={idx}
              >
                {tag.name}
              </button>
            );
          })}
          <div className="flex">
            <input
              id="blog_entry_new_tag"
              ref={blog_entry_new_tag}
              className="bg-black border active:border-b-white border-zinc-600 focus:border-b-white w-fit  px-2 py-1 outline-none"
            />
            <button
              className="text-3xl hover:bg-zinc-800 border-y border-r border-zinc-800 w-8 transition"
              onClick={async (e) => {
                e.preventDefault();

                if (blog_entry_new_tag.current!.value !== "") {
                  const new_tag = await newTag({
                    name: blog_entry_new_tag.current?.value!,
                  });

                  if (!PrismaClientErrors[new_tag.code]) {
                    blog_entry_new_tag.current!.value = "";
                    setTagList([...tagList, new_tag]);
                  } else {
                    new Notification().props({
                      type: "error",
                      title: "PRISMA CLIENT ERROR:",
                      description: PrismaClientErrors[new_tag.code],
                      seconds: 4,
                    });
                  }
                }
              }}
            >
              +
            </button>
          </div>
        </div>
        {form.getInputProps("tags").error && (
          <p className=" pl-3 pt-1 text-xs text-gray-600 saturate-[80%]">
            *{form.getInputProps("tags").error}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Contenido</label>
        <TextEditor
          content={blog_entry_content}
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          setContent={setContent}
        />
      </div>
      <button
        id="publish_entry_buton"
        className="border border-zinc-600 bg-zinc-900 transition h-10 hover:bg-white hover:text-black text-zinc-500 pointer-events-none"
        type="submit"
        onClick={async (e) => {
          e.preventDefault();

          const author = await getLoggedInUser();
          const parseResult = BlogEntrySchema.safeParse({
            ...form.values,
            cover_image: blog_entry_cover_image,
            content: blog_entry_content,
            author_name: author.user.name,
            author_id: author.id,
            tags: selectedTags,
            lang: lang,
            node: null,
          });

          if (parseResult.success) {
            if (blog_entry) {
              await updateBlogEntry(blog_entry.id, parseResult.data);
            } else {
              await createBlogEntry(parseResult.data);
            }
          } else {
            new Notification().props({
              title: "Error publicando entrada",
              description: JSON.parse(parseResult.error.message).map(
                (m: { path: any; message: any }) => {
                  return `-${m.path} => ${m.message} \n`;
                }
              ),
              type: "error",
              seconds: 5,
            });
          }
        }}
      >
        Publicar entrada
      </button>
    </form>
  );
}
