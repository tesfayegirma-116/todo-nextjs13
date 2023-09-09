import Link from "next/link";
import { prisma } from "@/db";
import { TodoItem } from "@/components/TodoItem";

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Todos</h1>
        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          href="/new"
        >
          Add Todo
        </Link>
      </header>
      <ul className="flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, completed: boolean) {
  "use server";

  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed,
    },
  });
}
