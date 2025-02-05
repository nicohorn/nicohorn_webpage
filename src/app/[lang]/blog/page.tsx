import Title from "@/components/Title";
import React, { useRef } from "react";
import BlogCard from "./components/BlogCard";
import { getAllBlogEntriesWithTags } from "@/repositories/blog_entry";
import Link from "next/link";
import { getTags } from "@/repositories/blog_tag";
import ComboboxComponent from "@/components/TagsCombobox";
import type { Metadata } from "next";

type Props = {
  params: { id: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.lang === "en-US" ? "Nico Horn's Blog" : "Blog de Nico Horn",
    description:
      params.lang === "en-US"
        ? "Welcome to my blog, I'm Nico Horn, full stack developer, systems engineer and educator."
        : "Bienvenido a mi blog, soy Nico Horn, ingeniero, desarrollador y profesor. Acá comparto cosas sobre tecnología, política y a veces filosofía.",
    openGraph: {
      images:
        "https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    keywords: [
      "developer, engineer, educator, teacher, professor, nico, horn, nico horn, software, full stack, ingeniero, desarrollador, profesor, docente, universidad, university, cs graduate, computer science, networking",
    ],
  };
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string };
  params: { lang: string };
}) {
  const blog_entries = await getAllBlogEntriesWithTags(
    searchParams.tag,
    params.lang,
  );
  const tags = await getTags();

  if (!blog_entries) return null;
  if (blog_entries!.length < 1)
    return (
      <main className="main-y main-x flex flex-col gap-5">
        <Title size="lg" title="Blog" />
        <div className="text-5xl text-white">
          <div className="flex flex-col gap-2">
            <ComboboxComponent tags={tags!} lang={params.lang} />
          </div>
          {params.lang === "en-US"
            ? "No blog entries found 😔"
            : "No se encontraron entradas 😔"}
        </div>
      </main>
    );

  return (
    <main className="main-y main-x flex flex-col items-center gap-5">
      <Title size="lg" title="Blog" />
      <div className="flex flex-col gap-2">
        <ComboboxComponent tags={tags!} lang={params.lang} />
      </div>
      <div className="my-4">
        <div className="grid w-fit grid-cols-1 gap-5 lg:grid-cols-3">
          {blog_entries.map((entry, idx) => {
            return (
              <Link
                key={idx}
                prefetch
                scroll={false}
                href={`/${params.lang}/blog/${entry.id}`}
              >
                <BlogCard lang={params.lang} blog_entry={entry} idx={idx} />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
