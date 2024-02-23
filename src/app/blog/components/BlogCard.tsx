import React from "react";

export default function BlogCard() {
  return (
    <div className="p-6 bg-zinc-900 rounded-xl group flex flex-col gap-2 cursor-pointer">
      <div className="flex justify-between ">
        <h2 className="border-b border-white/50 group-hover:border-white text-xl pb-2 transition">
          Blog Card
        </h2>
        <p className="text-right text-white/60">
          {new Date().toLocaleDateString()}
        </p>
      </div>

      <p className="text-sm ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
        repellat impedit. Itaque sequi iusto neque ea placeat, atque obcaecati
        fuga possimus? Similique excepturi consequatur voluptates ipsam quo
        provident iusto quasi!
      </p>
      <div className="flex gap-1">
        <h3 className="px-2 py-1 bg-zinc-700 rounded-xl">tag</h3>
        <h3 className="px-2 py-1 bg-zinc-700 rounded-xl">dev</h3>
        <h3 className="px-2 py-1 bg-zinc-700 rounded-xl">enterprise</h3>
        <h3 className="px-2 py-1 bg-zinc-700 rounded-xl">gigs</h3>
        <h3 className="px-2 py-1 bg-zinc-700 rounded-xl">for fun</h3>
      </div>

      <p className="text-sm text-white/60 text-right">Nico Horn</p>
    </div>
  );
}

/* 
Blog entry must have

-title
-short_description
-content/text
-cover_image
-tags
-publication_date
-edited_date
-author

-likes???
-comments?

*/
