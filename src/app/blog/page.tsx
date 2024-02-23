import Title from "@/components/Title";
import React from "react";
import BlogCard from "./components/BlogCard";

export default function Page() {
  return (
    <main className="flex flex-col gap-6">
      <Title title="Blog" />
      <div className="grid grid-cols-4 gap-4">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </main>
  );
}
