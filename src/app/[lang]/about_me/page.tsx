import React from "react";
import AboutMeSection from "./components/AboutMeSection";
import Title from "@/components/Title";
import ProfessionalExperience from "./components/ProfessionalExperience";

export default function AboutMe({ params }: { params: { lang: string } }) {
  return (
    <main className="flex flex-col gap-2">
      <Title title={params.lang === "en-US" ? "About me" : "Acerca de mí"} />
      <AboutMeSection lang={params.lang} />
      {/* <Title
        title={
          params.lang === "en-US"
            ? "Professional experience"
            : "Experiencia profesional"
        }
      />
      <ProfessionalExperience lang={params.lang} /> */}
    </main>
  );
}
