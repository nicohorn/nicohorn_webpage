import { getAllProjects } from "@/repositories/project";
import React from "react";
import ProjectCard from "./components/ProjectCard";

export default async function Page() {
  const projects = await getAllProjects();

  return (
    <main className=" w-screen md:fixed md:left-0 ">
      <div className="no-scrollbar relative flex flex-col gap-4 py-4 md:flex-row md:px-12">
        <ProjectCard title="React component: multiple select" />
      </div>
    </main>
  );
}
