import React from "react";
import SquareLoader from "@/components/SquareLoader";

export default function Loading() {
  return (
    <main className="flex h-[50vh] w-screen items-center justify-center">
      <SquareLoader />
    </main>
  );
}
