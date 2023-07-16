import Link from "next/link";
import React from "react";
import { prisma } from "../db";
import { redirect } from "next/navigation";

const createTodo = async (data: FormData) => {
  "use server"
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title?.length === 0) throw new Error("Invalid title");

  console.log(title)
  await prisma.todo.create({ data: { title: title, completed: false } });
  redirect("/")
};
export default function NewPage() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-1 flex-col">
        {/* <label htmlFor={"title"}>Title</label> */}
        <input
          type="text"
          className="border bg-transparent border-slate-300 text-slate-100 px-2 py-1 roundedhover:bg-slate-600 focus-within:bg-slate-700 outline-none"
          name="title"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href={".."}
            className="border border-slate-300 text-slate-100 px-2 py-1 roundedhover:bg-slate-600 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-100 px-2 py-1 roundedhover:bg-slate-600 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
