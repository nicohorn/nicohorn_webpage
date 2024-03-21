import Landing from "@/components/Landing";

export default function Page({ params }: { params: { lang: string } }) {
  return (
    <main className="w-full flex flex-col">
      <Landing lang={params.lang} />
    </main>
  );
}

/* <div className="place-self-end shadow-lg">
        <a
          className="twitter-timeline"
          data-width="350"
          data-height="500"
          data-theme="dark"
          href="https://twitter.com/NicoTheEngineer?ref_src=twsrc%5Etfw"
        >
          Tweets by NicoTheEngineer
        </a>
      </div>

      <Script async src="https://platform.twitter.com/widgets.js" />
      <iframe
        className="w-full aspect-video bg-white"
        src="https://fastidious-lamington-ed3fd8.netlify.app/"
      ></iframe> */
