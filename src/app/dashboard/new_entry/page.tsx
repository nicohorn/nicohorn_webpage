"use client";

import Title from "@/components/Title";
import React from "react";
import TextEditor from "../components/TextEditor";
import { getToken } from "next-auth/jwt";

export default function Page() {
  const getLoggedInUser = async () => {
    const res = await fetch(`http://localhost:3000/api/auth/session`);
    return res.json().then((res) => {
      return { user: res.user, id: res.user.id };
    });
  };

  return (
    <main>
      <button
        onClick={async () => {
          console.log(await getLoggedInUser());
        }}
      >
        logged in user
      </button>
      <div className="xl:w-[50%] w-fit flex flex-col gap-4">
        <Title title="Entrada de blog" />
        <div className="flex flex-col gap-1">
          <label>Título</label>
          <input className="bg-black border px-2 py-1 outline-none text-4xl" />
        </div>
        <div className="flex flex-col gap-1">
          <label>Descripción corta</label>
          <textarea
            rows={4}
            className="bg-black border px-2 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Contenido</label>
          <TextEditor />
        </div>
      </div>
    </main>
  );
}
