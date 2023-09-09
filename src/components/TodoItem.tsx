"use client";

import moment from "moment";
type TodoItemProps = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  toggleTodo: (id: string, completed: boolean) => void;
};
export function TodoItem({
  id,
  title,
  completed,
  createdAt,
  toggleTodo,
}: TodoItemProps) {
  const formattedDate = moment(createdAt).fromNow();
  return (
    <div className="flex items-center py-2 px-4 border-b border-gray-200">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={completed}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      </label>
      <div className="ml-auto">
        <p className="text-sm text-gray-500">Created at: {formattedDate}</p>
      </div>
    </div>
  );
}
