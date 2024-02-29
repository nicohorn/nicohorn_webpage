/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const description = `[ingeniero en sistemas, desarrollador full stack, docente universitario]`;
  return (
    <main className="bg-black w-full flex justify-center flex-col items-center h-[80vh] gap-3">
      <h1 className="text-5xl">Nicolás Horn</h1>
      <p className="font-thin text-xl whitespace-pre-wrap">{description}</p>
      <img
        className="w-72 rounded-2xl"
        alt="Profile picture of Nico Horn"
        src="https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ></img>
      <a href="mailto:contact@nicohorn.com">contact@nicohorn.com</a>
    </main>
  );
}
