"use client";
import Title from "@/components/Title";
import React, { useRef, useState } from "react";
import TextEditor from "../components/TextEditor";
import { blog_entries } from "@prisma/client";
import { JSONContent } from "@tiptap/react";

export default function Page() {
  const blog_title = useRef<HTMLInputElement>(null);
  const blog_description = useRef<HTMLTextAreaElement>(null);
  const blog_entry_cover_image = useRef<HTMLInputElement>(null);
  const blog_entry_tags = useRef<HTMLInputElement>(null);

  const [blog_entry_content, setContent] = useState<JSONContent>();

  const getLoggedInUser = async () => {
    const res = await fetch(`http://localhost:3000/api/auth/session`);
    return res.json().then((res) => {
      return { user: res.user, id: res.user.id };
    });
  };

  const createBlogEntry = async (blog_entry: Omit<blog_entries, "id">) => {
    const res = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(blog_entry),
    });

    if (res) {
      console.log("res", res);
      return res.json();
    } else {
      console.log("Error creating post");
    }
  };

  return (
    <main>
      <div className="xl:w-[50%] w-fit flex flex-col gap-4">
        <button
          onClick={() => {
            console.log(blog_entry_content);
          }}
        >
          log blog content
        </button>
        <Title title="Entrada de blog" />
        <div className="flex flex-col gap-1">
          <label htmlFor="blog_entry_title">Título</label>
          <input
            id="blog_entry_title"
            ref={blog_title}
            className="bg-black border border-zinc-600 focus:border-b-white transition px-2 py-1 outline-none text-4xl"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="blog_entry_description">Descripción corta</label>
          <textarea
            id="blog_entry_description"
            ref={blog_description}
            rows={4}
            className="bg-black border border-zinc-600 focus:border-b-white  px-2 py-1 outline-none"
          />
        </div>
        <div className="flex">
          <label
            htmlFor="blog_entry_cover_image"
            className="flex-grow p-2 text-center border border-zinc-600 cursor-pointer hover:bg-white hover:text-black transition"
          >
            Imagen de portada
          </label>
          <input
            ref={blog_entry_cover_image}
            className="hidden"
            id="blog_entry_cover_image"
            type="file"
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="blog_entry_tags">Tags</label>
          <input
            id="blog_entry_tags"
            ref={blog_entry_tags}
            className="bg-black border border-zinc-600 focus:border-b-white  px-2 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Contenido</label>
          <TextEditor setContent={setContent} />
        </div>
      </div>
    </main>
  );
}

/* 
Blog entry must have

-title
-short_description
-content/text
-cover_image
-tags
-publication_date
-edited_date
-author
-node?

-likes???
-comments?

*/
