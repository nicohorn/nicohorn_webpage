import React from "react";
import AboutMeSection from "./components/AboutMeSection";
import Title from "@/components/Title";
import ProfessionalExperience from "./components/WorkExperience";

export default function AboutMe({ params }: { params: { lang: string } }) {
  return (
    <main className="main-y main-x flex flex-col gap-8 lg:max-w-[700px]">
      <div>
        <Title
          size="md"
          title={params.lang === "en-US" ? "About me" : "Acerca de mí"}
        />
        <AboutMeSection lang={params.lang} />
      </div>
      <div>
        <Title
          size="md"
          title={
            params.lang === "en-US"
              ? "Work experience"
              : "Experiencia profesional"
          }
        />
        <ProfessionalExperience lang={params.lang} />
      </div>
    </main>
  );
}
