import React from "react";

const statusClasses = {
  pendente: "bg-yellow-500 text-white",
  "em progresso": "bg-blue-500 text-white",
  concluída: "bg-green-500 text-white",
  falha: "bg-red-500 text-white",
};

export default function TaskStatusButton({ status }) {
  const statusClass = statusClasses[status] || "bg-gray-500 text-white";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
    >
      {status}
    </span>
  );
}
