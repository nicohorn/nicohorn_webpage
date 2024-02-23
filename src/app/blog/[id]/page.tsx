import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  return <main className="-mt-20">{params.id}</main>;
}
