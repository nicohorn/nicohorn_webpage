import React from "react";
import AboutMeSection from "./components/AboutMeSection";
import Title from "@/components/Title";

export default function AboutMe({ params }: { params: { lang: string } }) {
  return (
    <main>
      <Title title={params.lang === "en-US" ? "About me" : "Acerca de mí"} />
      <AboutMeSection lang={params.lang} />
    </main>
  );
}
