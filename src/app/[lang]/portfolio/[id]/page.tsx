/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Code2,
  Github,
  Globe,
  LayoutDashboard,
  Lock,
  Server,
} from "lucide-react";
import projects from "../portfolio.json";
import { ImageModal } from "../components/ImageModal";
import { Roboto_Slab } from "next/font/google";

const roboto_slab = Roboto_Slab({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
});

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function Page({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const project = projects.find((p) => createSlug(p.title) === params.id);

  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    description: string;
  } | null>(null);

  const openModal = (image: { image: string; description: string }) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!project) return null;

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Header Section */}
      <div className="mb-12 border-b border-secondary/20 pb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-white">
              <Calendar size={16} />
              {project.date}
            </span>
            {project.featured && (
              <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-white">
                Featured Project
              </span>
            )}
            <span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-white">
              <Clock size={16} />
              {project.hours_worked} hours
            </span>
          </div>

          <h1
            className={`${roboto_slab.className} text-4xl font-bold tracking-tight text-white sm:text-6xl`}
          >
            {project.title}
          </h1>

          <p
            className={`max-w-4xl text-xl text-neutral ${roboto_slab.className}`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-white"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-4 flex gap-4">
            <a
              href={project.live_demo}
              target="_blank"
              className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-semibold text-white transition hover:bg-accent/90"
            >
              <Globe size={20} />
              Live Demo
            </a>
            <a
              target="_blank"
              href={project.github}
              className="flex items-center gap-2 rounded-md border border-secondary px-4 py-2 font-semibold text-neutral transition hover:bg-secondary/10"
            >
              <Github size={20} />
              View Code
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Left Column - Technical Details */}
        <div className="lg:col-span-2">
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Technical Overview
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Frontend Features */}
              <div
                className={`rounded-md border border-secondary bg-primary p-6 shadow-lg ${!project.technical_details.backend_features && !project.technical_details.security && "col-span-full "}`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <LayoutDashboard className="text-accent" />
                  <h3 className="text-xl font-semibold text-white">
                    Frontend Features
                  </h3>
                </div>
                <ul className="space-y-2">
                  {project.technical_details.frontend_features.map(
                    (feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
                        <span className="text-neutral">{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Backend Features */}
              {project.technical_details.backend_features && (
                <div className="rounded-md border border-secondary bg-primary p-6 shadow-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <Server className="text-accent" />
                    <h3 className="text-xl font-semibold text-white">
                      Backend Features
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {project.technical_details.backend_features?.map(
                      (feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
                          <span className="text-neutral">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              {/* Security Features */}
              {project.technical_details.security && (
                <div className="rounded-md border border-secondary bg-primary p-6 shadow-lg sm:col-span-2">
                  <div className="mb-4 flex items-center gap-2">
                    <Lock className="text-accent" />
                    <h3 className="text-xl font-semibold text-white">
                      Security Features
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {project.technical_details.security?.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
                        <span className="text-neutral">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-white">
              About the Project
            </h2>
            <div className="prose prose-lg prose-headings:text-white prose-p:text-neutral max-w-none">
              <p>{project.extended_description}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="lg:relative lg:col-span-1">
          <div className="flex flex-col lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Project Gallery
            </h2>
            <div className="scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary flex-1 space-y-6 overflow-y-auto pr-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-md border border-secondary bg-primary shadow-lg transition-transform hover:scale-[1.02]"
                  onClick={() => openModal(image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      openModal(image);
                    }
                  }}
                >
                  <div className="relative">
                    <img
                      src={image.image}
                      alt={image.description}
                      className="w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-sm font-medium text-white">
                        Click to expand
                      </span>
                    </div>
                  </div>
                  {image.description && (
                    <div className="p-4">
                      <p className="text-sm text-neutral">
                        {image.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-12 rounded-md border border-secondary bg-primary p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Project Statistics
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium text-neutral">
              Total Lines of Code
            </h3>
            <p className="mt-2 text-3xl font-bold text-white">
              {project.total_lines_of_code}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral">Hours Worked</h3>
            <p className="mt-2 text-3xl font-bold text-white">
              {project.hours_worked}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral">
              Technologies Used
            </h3>
            <p className="mt-2 text-3xl font-bold text-white">
              {project.technologies.length}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral">Key Features</h3>
            <p className="mt-2 text-3xl font-bold text-white">
              {project.features.length}
            </p>
          </div>
        </div>
      </div>
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={closeModal}
        image={selectedImage!}
      />
    </motion.main>
  );
}
