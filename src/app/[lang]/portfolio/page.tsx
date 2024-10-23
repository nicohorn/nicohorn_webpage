import { getAllProjects } from "@/repositories/project";
import React from "react";
import ProjectCard from "./components/ProjectCard";
import portfolio from "./portfolio.json";
import { Roboto_Slab } from "next/font/google";

const roboto_slab = Roboto_Slab({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
});

export default async function Page() {
  return (
    <main className="main-y mx-20 flex flex-col items-center gap-8">
      <h1 className={`${roboto_slab.className} text-6xl`}>Portfolio</h1>
      <p>
        A curated collection of my web development projects, from full-stack
        applications to specialized components and utilities.
      </p>
      <div className="grid grid-cols-4 gap-8 py-4">
        {portfolio.map((p, idx) => {
          return (
            <div className={`${p.featured && "col-span-2"}`} key={idx}>
              <ProjectCard project={p} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
