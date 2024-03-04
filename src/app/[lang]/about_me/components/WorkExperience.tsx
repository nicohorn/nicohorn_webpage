/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { IconArrowBadgeRightFilled } from "@tabler/icons-react";
import {
  IconArrowMoveRight,
  IconCoffee,
  IconRocket,
  IconToolsKitchen2,
  IconCamera,
  IconIcons,
  IconBrandDatabricks,
  IconUser,
  IconMovie,
  IconCode,
} from "@tabler/icons-react";

import { Merriweather } from "next/font/google";
const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

export default function ProfessionalExperience({ lang }: { lang: string }) {
  const Timeline = ({
    yearsWithItems,
  }: {
    yearsWithItems: {
      year: string;
      items: {
        title: string;
        description: string;
        icon?: React.ReactNode;
        start?: string;
        finish?: string;
      }[];
    }[];
  }) => {
    return (
      <div className="flex flex-col ml-6 mt-4 border-b-2 border-yellow-300 border-dashed  ">
        {yearsWithItems.map((yearItem, idx) => {
          return (
            <div
              className="border-dashed border-l-2 border-yellow-300 px-4 relative pb-6 "
              key={idx}
            >
              <h1 className="text-lg font-bold mb-2 rounded-md -translate-x-10 bg-yellow-300 w-fit px-2 text-black ">
                {yearItem.year}
              </h1>
              <div className="absolute border-b w-full -translate-y-6 translate-x-2 border-white/20"></div>
              <div>
                {yearItem.items.map((item, idx) => {
                  return (
                    <div
                      className="flex flex-col md:flex-row justify-between items-center"
                      key={idx}
                    >
                      <div>
                        {" "}
                        <div className="flex items-center">
                          <span className="ml-4">
                            <IconArrowMoveRight />
                          </span>
                          <h3 className=" ml-6 my-1 px-2 font-bold -translate-x-4 mb-2 bg-white w-fit text-black">
                            {item.title}
                          </h3>
                        </div>
                        <p
                          className={`${merriweather.className} font-bold ml-5 mb-3 text-zinc-300`}
                        >
                          {item.description}
                        </p>
                      </div>
                      <div className="px-5 mb-3 md:mb-0">{item.icon}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const yearItems = ({ lang }: { lang: string }) => {
    const langIsEnglish = lang === "en-US";
    return [
      {
        year: "2022",
        items: [
          {
            title: langIsEnglish ? "pqlub Cofounder" : "Cofundador de pqlub",
            description: langIsEnglish
              ? "Together with 2 colleagues, we formed a systems development venture. The idea was to tackle larger projects. The most interesting project, which continues to this day, is the research management system for River Plate Adventist University. This project was requested by the Deparment of Research and Development and was designed and implemented from scratch by us. The technologies we have used throughout the project include Next.js, Prisma, MongoDB, Zod for validations, NextAuth, etc."
              : "Junto a 2 colegas conformamos un emprendimiento de desarrollo de sistemas. La idea fue poder encarar proyectos más grandes. El proyecto más interesante y que sigue hasta la actualidad es el sistema de gestión de investgaciones de la Universidad Adventista del Plata. Este proyecto fue solicitado por la Vicerrectoría de Investigación y Desarrollo, el cual fue diseñado e implementado desde 0 por nosotros. Las tecnologías que hemos utilizado a lo largo de desarrollo del proyecto son: Next.js, Prisma, MongoDB, Zod para validaciones, NextAuth, etc.",
            icon: <IconRocket width={28} height={28} />,
          },
          {
            title: langIsEnglish
              ? "Video Editor for Private Client"
              : "Editor de Videos para Cliente Particular",
            description: langIsEnglish
              ? "Kept working for the same client."
              : "Continué trabajando para el mismo cliente.",
            icon: <IconMovie width={28} height={28} />,
          },
        ],
      },
      {
        year: "2021",
        items: [
          {
            title: langIsEnglish ? "FACTO Intern" : "Pasante en FACTO",
            description: langIsEnglish
              ? "Development of more webcrawlers and RESTful API's"
              : "Más webcrawlers y desarrollo de RESTful APIs",
            icon: <IconCode width={28} height={28} />,
          },
          {
            title: langIsEnglish
              ? "Video Editor for Private Client"
              : "Editor de Videos para Cliente Particular",
            description: langIsEnglish
              ? "After working on a particular account for a while in Bukuji, the client was so delighted with my work that she offered me and 3 more colleagues to work full time for her, x5 our salaries."
              : "Después de trabajar en una cuenta específica durante un tiempo en Bukuji, la cliente quedó tan encantada con mi trabajo que me ofreció a mí y a otros 3 colegas trabajar a tiempo completo para ella, multiplicando nuestros salarios por 5.",
            icon: <IconMovie width={28} height={28} />,
          },

          {
            title: langIsEnglish
              ? "Freelance Software Engineer"
              : "Desarrollador Full Stack Freelance",
            description: langIsEnglish
              ? "Worked on a clinic management system project for a small clinic. The project involved the design of the whole system, from the architecture to the implementation of the requirements. I learned to use tools such as React Class components, GraphQL, MongoDB, node.js, etc."
              : "Trabajé en el desarrollo de un sistema de gestión de clínicas para una clínica pequeña. El proyecto involucró el diseño de todo el sistema, desde la arquitectura hasta la implementación de los requisitos. Aprendí a utilizar herramientas como componentes de clase de React, GraphQL, node.js, MongoDB, etc.",
            icon: <IconCode width={28} height={28} />,
          },
        ],
      },
      {
        year: "2020",
        items: [
          {
            title: langIsEnglish ? "FACTO Intern" : "Pasante en FACTO",
            description: langIsEnglish
              ? "I worked at FACTO, a small systems development company. My responsibilities included designing user interfaces for various products and developing web crawlers to collect data on products from different supermarkets in Argentina (Walmart, DIA, regional cooperatives, etc.). This experience was valuable for reinforcing scripting concepts and learning to use libraries like Selenium in Python and Puppeteer in JavaScript."
              : "Trabajé en FACTO, una empresa pequeña de desarrollo de sistemas. Mis responsabilidades fueron: diseñar interfaces de usuario para diferentes productos y desarrollar web crawlers para adquirir datos sobre los productos de diversos hipermercados de Argentina (Walmart, DIA, Cooperativas regionales, etc). Esta experiencia fue muy buena para solidificar conceptos de scripting y aprender a usar librerías como Selenium de Python y Puppeteer de JavaScript.",
            icon: <IconCode width={28} height={28} />,
          },
          {
            title: langIsEnglish
              ? "Bukuji Remote Video Editor"
              : "Editor de Videos para Bukuji",
            description: langIsEnglish
              ? "When Covid hit, I had to look for jobs online and I started working at Bukuji, a digital marketing agency from the USA as a video editor. The agency was conformed of 8 people plus various freelancers, I was the main video editor."
              : "Con la llegada del Covid, tuve que buscar trabajos online y comencé a trabajar en Bukuji, una agencia de marketing digital de Estados Unidos como editor de videos. La agencia estaba conformada por 8 personas más varios freelancers, y yo era el principal editor de videos.",
            icon: <IconMovie width={28} height={28} />,
          },

          {
            title: langIsEnglish
              ? "Freelance Web Developer"
              : "Desarrollador Web freelance",
            description: langIsEnglish
              ? "Worked various freelance projects as a web developer."
              : "Realicé trabajos de desarrollo web como freelancer.",
            icon: <IconCode width={28} height={28} />,
          },
        ],
      },
      {
        year: "2019",
        items: [
          {
            title: langIsEnglish ? "güelcom Manager" : "Gerente de güelcom",
            description: langIsEnglish
              ? "In addition to continuing to perform regular barista tasks, I became the barista supervisor, organizing the work and also participating in the analysis and creation of new products."
              : "Luego de 3 años trabajando, desde 2016 hasta 2019, se me concedió la responsabilidad de gerenciar güelcom. Entre mis responsabilidades estaban: entrenar nuevos empleados, supervisar a los encargados de turno, organizar horarios, organizar y atender proveedores, organizar horarios, creación de manuales de trabajo, disciplina de empleados y más.",
            icon: <IconUser width={28} height={28} />,
          },
          {
            title: langIsEnglish
              ? "Becario de Investigación"
              : "Research Assistant",
            description: langIsEnglish
              ? "Participated briefly in a research study on indoor air quality in hospitals."
              : "Participé brevemente de una investigación acerca de la calidad del aire en hospitales.",
            icon: <IconBrandDatabricks width={28} height={28} />,
          },
        ],
      },
      {
        year: "2018",
        items: [
          {
            title: langIsEnglish ? "Barista Manager" : "Encargado de Baristas",
            description: langIsEnglish
              ? "In addition to continuing to perform regular barista tasks, I became the barista supervisor, organizing the work and also participating in the analysis and creation of new products."
              : "Además de continuar realizando tareas regulares de barista, pasé a ser el encargado de los baristas, organizando el trabajo y también participando del análisis y creación de productos nuevos.",
            icon: <IconCoffee width={28} height={28} />,
          },
          {
            title: langIsEnglish ? "teggo CEO" : "Líder de teggo",
            description: langIsEnglish
              ? "The business grew and we were able to get a lot of equipment to continue providing a great service to our customers."
              : "El emprendimiento creció y logramos conseguir mucho equipamiento para continuar brindando un buen servicio a nuestros clientes.",
            icon: <IconRocket width={28} height={28} />,
          },
          {
            title: langIsEnglish ? "Web Developer" : "Desarrolador Web",
            description: langIsEnglish
              ? "Made a few static websites for events at my university."
              : "Creé algunos sitios web estáticos para eventos de mi universidad.",
            icon: <IconCode width={28} height={28} />,
          },
        ],
      },
      {
        year: "2017",
        items: [
          {
            title: langIsEnglish ? "teggo founder" : "Co-creador de teggo",
            description:
              lang === "en-US"
                ? "With the experience I gained while working as a photographer and video producer, I opened my own business with three colleagues: teggo. Among the things I did were: photography and video production for weddings, digital marketing and development of static web pages."
                : "Con la experiencia que gané haciendo fotos y videos, abrí mi propio emprendimiento junto a tres compañeros: teggo. Entre las cosas que realicé estuvieron: fotografía y producción de videos para casamientos, marketing digital y desarrollo de páginas web estáticas.",
            icon: <IconRocket width={28} height={28} />,
          },
          {
            title: "Barista",
            description: langIsEnglish
              ? "After a year of working as a waiter, I was trained to start preparing coffee shop drinks. I took specialty coffee courses."
              : "Luego de un año de trabajo como mesero, fui entrenado para comenzar a preparar las bebidas de la cafetería. Realicé cursos de café de especialidad.",
            icon: <IconCoffee width={28} height={28} />,
          },
        ],
      },
      {
        year: "2016",
        items: [
          {
            title: langIsEnglish ? "Waiter/Server" : "Mesero",
            description: langIsEnglish
              ? "My responsibilities were taking and delivering orders at güelcom, a coffee shop in the city I live in"
              : "Responsable de tomar y entregar pedidos en güelcom, una cafetería donde vivo.",
            icon: <IconToolsKitchen2 width={28} height={28} />,
          },
          {
            title: langIsEnglish ? "Photographer" : "Fotógrafo",
            description: langIsEnglish
              ? "I started working as a professional photographer."
              : "Comencé a realizar algunos trabajos pagos como fotógrafo profesional.",
            icon: <IconCamera width={28} height={28} />,
          },
        ],
      },
      {
        year: "2015",
        items: [
          {
            title: langIsEnglish
              ? "Graphic Design Studio Assistant"
              : "Ayudante de Estudio de Diseño Gráfico",
            description:
              "Entre las cosas que aprendí están: ploteados, diseños, serigrafía, letras corpóreas y sobre el proceso creativo para brindar valor a un cliente.",
            icon: <IconIcons width={28} height={28} />,
          },
          {
            title: langIsEnglish
              ? "Volunteer Photographer"
              : "Fotógrafo Voluntario",
            description: langIsEnglish
              ? "I worked photographing Christian university groups that carried out community service activities"
              : "Trabajé fotografíando grupos universitarios cristianos que realizaban tareas de ayuda comunitaria. Trabajé fotografíando grupos universitarios cristianos que realizaban tareas de ayuda comunitaria.",
            icon: <IconCamera width={28} height={28} />,
          },
        ],
      },
      {
        year: "2014",
        items: [
          {
            title: langIsEnglish
              ? "Volunteer Photographer and Video Editor"
              : "Fotógrafo y Editor de Videos Voluntario",
            description: langIsEnglish
              ? "In order to obtain donations for missionary activities, I worked making videos to showcast the activities carried out by the missionary groups."
              : "Con la finalidad de conseguir donaciones para actividades misioneras, trabajé haciendo videos mostrando las tareas realizadas por los grupos misioneros.",
            icon: <IconCamera width={28} height={28} />,
          },
        ],
      },
    ];
  };

  return (
    <div className="lg:max-w-[60vw] md:pr-10 lg:pr-0">
      <Timeline yearsWithItems={yearItems({ lang: lang })} />
      {/* <div>
        <h1>Skills</h1>
        <p>Web design</p>
        <p>RESTful API's</p>
        <p>Strong knowledge in UX/UI</p>
        <p>Web development</p>
        <p>JavaScript</p>
        <p>Relational databases</p>
        <p>Non relational databases</p>
      </div> */}
    </div>
  );
}
