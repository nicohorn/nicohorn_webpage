import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return <main>Blog id: {params.id}</main>;
}
