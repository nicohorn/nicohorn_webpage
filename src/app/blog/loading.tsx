import SquareLoader from "@/components/SquareLoader";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full flex justify-center h-[30vh] items-center">
      <SquareLoader />
    </div>
  );
}
