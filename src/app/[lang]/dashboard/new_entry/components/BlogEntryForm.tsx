/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import Title from "@/components/Title";
import TextEditor from "../components/TextEditor";
import { blog_entries, blog_tags } from "@prisma/client";
import { useForm, zodResolver } from "@mantine/form";
import { BlogEntry, BlogEntrySchema } from "@/zod";
import { PrismaClientErrors } from "@/utils/dictionaries/PrismaClientErrors";
import { supabase } from "@/supabase";

//Had to create these two types here to make the createBlogEntry parameter type more readable.
type BlogEntryWithoutIdCreatedAt = Omit<
  blog_entries,
  "id" | "edited_at" | "created_at"
>;
type BlogEntryWithTagsForm = BlogEntryWithoutIdCreatedAt & {
  tags: { id: string; name: string }[];
};

export default function BlogEntryForm({ tags }: { tags: blog_tags[] }) {
  const blog_title = useRef<HTMLInputElement>(null);
  const blog_description = useRef<HTMLTextAreaElement>(null);
  const blog_entry_cover_image_input = useRef<HTMLInputElement>(null);
  const [blog_entry_cover_image, setBlogEntryCoverImage] = useState<string>();
  const blog_entry_new_tag = useRef<HTMLInputElement>(null);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [blog_entry_content, setContent] = useState<string>();
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

  const createBlogEntry = async (blog_entry: BlogEntryWithTagsForm) => {
    const res = await fetch("/api/blog_entry", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(blog_entry),
    });

    if (res) {
      console.log("client createBlogEntry res", res);
      return res.json();
    } else {
      console.log("Error creating post");
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

  const form = useForm<BlogEntry>({
    validate: zodResolver(BlogEntrySchema),
    validateInputOnBlur: true,
  });

  return (
    <form className="xl:w-[50%] w-fit flex flex-col gap-4">
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
      </div>
      <div className="flex gap-5">
        <label
          htmlFor="blog_entry_cover_image"
          className="h-fit flex-grow self-center p-2 text-center border border-zinc-900/60 bg-zinc-900/60 cursor-pointer hover:bg-white hover:text-black transition"
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
            else console.log("error uploading cover image", error);
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
            return (
              <button
                onClick={(e) => {
                  e.preventDefault();

                  if (!selectedTags.includes(tag)) {
                    setSelectedTags([...selectedTags, tag]);
                  } else {
                    setSelectedTags([
                      ...selectedTags.filter((tag_from_selected_list) => {
                        return tag_from_selected_list.name !== tag.name;
                      }),
                    ]);
                  }
                }}
                className={`${
                  selectedTags.includes(tag)
                    ? "text-white"
                    : " text-zinc-600 border-zinc-600 hover:border-zinc-400 hover:text-zinc-400"
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
                    console.log(
                      "PRISMA CLIENT ERROR: ",
                      PrismaClientErrors[new_tag.code]
                    );
                  }
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label>Contenido</label>
        <TextEditor
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          setContent={setContent}
        />
      </div>
      <button
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
            node: null,
          });

          console.log("safe parse result", parseResult);
          if (parseResult.success) await createBlogEntry(parseResult.data);
          else {
            console.log(parseResult.error.message);
          }
        }}
      >
        Log images
      </button>
    </form>
  );
}

/* 
I'm retrieving the tags from the db on the ssr-ed page that is parent to this client side component. I'm leaving the option to add tags too, I know how to show the new added tags to the bd using useState.
-- hw -> investigate how to do that without using useState. Update: apparently this isn't needed at all.

-- hw -> set unique title and cover_image as a safeguard to not publish twice the same content, although this should be solved by redirecting to the blog entry once the response is sucessful.
 */
