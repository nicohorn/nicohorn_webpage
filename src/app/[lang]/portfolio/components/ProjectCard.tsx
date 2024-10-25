/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Code2, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Roboto_Slab } from "next/font/google";

const roboto_slab = Roboto_Slab({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
});

interface Project {
  title: string;
  description: string;
  features: string[];
  date: string;
  extended_description: string;
  technologies: string[];
  images: {
    image: string;
    description: string;
  }[];
  total_lines_of_code: string;
  hours_worked: string;
  featured: boolean;
  technical_details: {
    frontend_features: string[];
    backend_features?: string[];
    security?: string[];
  };
  github: string;
  live_demo: string;
}

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function ProjectCard({
  project,
  idx = 0,
}: {
  project: Project;
  idx?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: -10 }}
      transition={{ delay: Math.random() * 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleOnMouseMove}
      className="group relative flex h-full min-h-[300px] rounded border border-black bg-primary text-white shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] transition hover:border-accent"
    >
      <div className="card group flex w-full flex-grow flex-col">
        <div className="relative w-full border-b border-accent px-4 py-3 shadow-lg">
          {project.featured && (
            <div className="absolute right-4 top-0 z-50 -translate-y-1/2 rounded bg-accent px-2 py-1 text-xs font-bold">
              Featured
            </div>
          )}
          <div className="absolute z-40 flex w-fit -translate-x-2 -translate-y-[26px] items-center gap-2 rounded bg-secondary px-2 text-sm font-semibold shadow-lg">
            <Calendar className="h-4 w-4" />
            <span>{project.date}</span>
          </div>
          <h1
            className={`${roboto_slab.className} ${!project.featured && "text-2xl"} font-bold text-neutral`}
          >
            {project.title}
          </h1>
        </div>

        <div className="flex flex-grow flex-col px-4">
          <p className="py-5">{project.description}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Code2 size={16} className="text-gray-400" />
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-neutral/40 bg-black px-3 py-1 text-xs font-extrabold"
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.div
            animate={{ height: isExpanded ? "auto" : 0 }}
            initial={false}
            className="overflow-hidden"
          >
            {project.technical_details && (
              <div className="mt-4 grid gap-4 text-sm text-gray-300 md:grid-cols-2">
                {project.technical_details.frontend_features && (
                  <div>
                    <h3 className="font-bold text-white">Frontend Features</h3>
                    <ul className="ml-4 mt-2 list-disc">
                      {project.technical_details.frontend_features
                        .slice(0, 3)
                        .map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                  </div>
                )}
                {project.technical_details.backend_features && (
                  <div>
                    <h3 className="font-bold text-white">Backend Features</h3>
                    <ul className="ml-4 mt-2 list-disc">
                      {project.technical_details.backend_features
                        ?.slice(0, 3)
                        .map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {project.featured && project.images.length > 0 && (
              <div className="z-50 mt-4 flex gap-2 overflow-x-auto">
                {project.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image.image}
                    alt={image.description || `Project screenshot ${index + 1}`}
                    className="h-32 rounded-md object-cover"
                  />
                ))}
              </div>
            )}
          </motion.div>

          <div className="z-50 mt-auto flex items-center justify-between p-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
            >
              {isExpanded ? "Show less" : "Show more"}
              <ChevronRight
                size={16}
                className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            </button>

            <Link
              href={`${pathname}/${createSlug(project.title)}`}
              className=" hover:text-info/40 flex items-center gap-1 text-sm text-info"
            >
              View Details <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
