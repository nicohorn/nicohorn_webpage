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
    blog_entry?.content || "<h1>Hello world!</h1>",
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
    blog_entry: BlogEntryWithTagsForm,
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
    <form className="flex flex-col gap-4 text-white xl:w-[50%]">
      <Title
        size="md"
        title={lang === "en-US" ? "Blog entry" : "Entrada de blog"}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="blog_entry_title">
          {lang === "en-US" ? "Title" : "Título"}
        </label>
        <input
          value={""}
          id="blog_entry_title"
          ref={blog_title}
          className="border-secondary h-14 rounded border bg-black px-2 text-4xl outline-none  transition focus:border-b-white"
          //== hw => fix the warning "A component is changing an uncontrolled input to be controlled" https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
          {...form.getInputProps("title")}
        />
        {form.getInputProps("title").error && (
          <p className=" text-neutral pl-3 pt-1 text-xs  saturate-[80%]">
            *{form.getInputProps("title").error}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="blog_entry_description">
          {lang === "en-US" ? "Short description" : "Descripción corta"}
        </label>
        <textarea
          {...form.getInputProps("description")}
          id="blog_entry_description"
          ref={blog_description}
          rows={4}
          className="border-secondary rounded border bg-black px-2  py-1 outline-none focus:border-b-white"
        />
        {form.getInputProps("description").error && (
          <p className=" text-neutral pl-3 pt-1 text-xs  saturate-[80%]">
            *{form.getInputProps("description").error}
          </p>
        )}
      </div>
      <div className="flex gap-5">
        <label
          htmlFor="blog_entry_cover_image"
          className="border-secondary bg-background h-fit flex-grow cursor-pointer self-center rounded border p-2 text-center transition hover:bg-white hover:text-black"
        >
          {lang === "en-US" ? "Cover image" : "Imagen de portada"}
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
        <div className={blog_entry_cover_image ? "relative w-40 " : "hidden"}>
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
            className="absolute -right-1 -top-1 w-6 rounded-full bg-white pb-1 text-center text-black opacity-50 transition hover:opacity-100"
          >
            x
          </button>
          <img alt="Blog entry cover image" src={blog_entry_cover_image}></img>
        </div>
      </div>
      <div className="flex flex-col gap-1 ">
        <p>Tags</p>
        <div className="flex flex-wrap gap-2">
          {tagList?.map((tag, idx) => {
            const isTagSelected = selectedTags.some(
              (selectedTag) => selectedTag.name === tag.name,
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
                        (selectedTag) => selectedTag.name !== tag.name,
                      ),
                    ]);
                  }
                }}
                className={`${
                  isTagSelected
                    ? "bg-primary border-primary text-white"
                    : "border-secondary  text-neutral hover:border-secondary hover:text-zinc-400"
                } cursor-pointer rounded border px-2 py-1`}
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
              className="border-secondary w-fit rounded-l  border bg-black px-2 py-1  outline-none focus:border-b-white active:border-b-white"
            />
            <button
              className="border-secondary hover:text-neutral hover:bg-background w-8 rounded-r border-y border-r text-3xl transition"
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
          <p className=" text-neutral pl-3 pt-1 text-xs  saturate-[80%]">
            *{form.getInputProps("tags").error}
          </p>
        )}
      </div>
      <div className="relative flex flex-col gap-1">
        <label>
          {lang === "en-US" ? "Blog content" : "Contenido del blog"}
        </label>
        <TextEditor
          content={blog_entry_content}
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          setContent={setContent}
        />
      </div>
      <button
        id="publish_entry_buton"
        className="border-secondary bg-background pointer-events-none h-10 rounded border text-white transition hover:bg-white hover:text-black"
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
                },
              ),
              type: "error",
              seconds: 5,
            });
          }
        }}
      >
        {blog_entry
          ? lang === "en-US"
            ? "Save changes"
            : "Guardar cambios"
          : lang === "en-US"
            ? "Publish new entry"
            : "Publicar entrada"}
      </button>
    </form>
  );
}
