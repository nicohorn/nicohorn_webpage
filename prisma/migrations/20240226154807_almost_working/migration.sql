-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "next_auth";

-- CreateTable
CREATE TABLE "next_auth"."users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "role" TEXT NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_entries" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "edited_at" TIMESTAMP(3) NOT NULL,
    "author_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "node" TEXT,

    CONSTRAINT "blog_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "blog_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_entries_on_tags" (
    "blog_entry_id" UUID NOT NULL,
    "blog_tag_id" UUID NOT NULL,

    CONSTRAINT "blog_entries_on_tags_pkey" PRIMARY KEY ("blog_entry_id","blog_tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "next_auth"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."blog_entries_on_tags" ADD CONSTRAINT "blog_entries_on_tags_blog_entry_id_fkey" FOREIGN KEY ("blog_entry_id") REFERENCES "public"."blog_entries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blog_entries_on_tags" ADD CONSTRAINT "blog_entries_on_tags_blog_tag_id_fkey" FOREIGN KEY ("blog_tag_id") REFERENCES "public"."blog_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
