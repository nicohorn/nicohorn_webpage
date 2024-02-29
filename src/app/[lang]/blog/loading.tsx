import React from "react";
import SquareLoader from "@/components/SquareLoader";

export default function Loading() {
  return (
    <div className="w-full flex justify-center h-[40vh] items-center">
      <SquareLoader />
    </div>
  );
}
