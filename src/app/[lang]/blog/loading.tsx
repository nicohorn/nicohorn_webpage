import React from "react";

export default function Loading() {
  return (
    <main className="fixed left-0 top-0 -z-50 mx-auto my-auto flex h-screen w-screen justify-center bg-black">
      <div className="border-accent mt-[45vh] h-10 w-10 animate-spin rounded-full border-b"></div>
    </main>
  );
}
