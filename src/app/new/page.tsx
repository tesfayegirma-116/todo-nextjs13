import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Title is required");
  }
  await prisma.todo.create({
    data: {
      title,
      completed: false,
    },
  });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Todos</h1>
      </header>

      <form action={createTodo} className="space-y-4">
        <input
          type="text"
          name="title"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <div className="flex justify-center gap-2">
          <Link
            href=".."
            className="border border-gray-300 px-3 py-2 text-gray-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className=" bg-blue-900 px-4 py-2 text-white font-semibold hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
