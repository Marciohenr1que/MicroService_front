import React from "react";
import TaskStatusButton from "../components/TaskStatusButton";
import tasksService from "../services/tasksService"; // Certifique-se de que o caminho está correto
import { toast } from "react-toastify";

export default function TaskTable({ tasks, onTaskUpdated, onTaskDeleted }) {
  const handleEdit = async (task) => {
    const newTitle = prompt("Digite o novo título:", task.title);
    const newDescription = prompt("Digite a nova descrição:", task.description);

    if (newTitle && newDescription) {
      try {
        const updatedTask = await tasksService.updateTask(task.id, {
          title: newTitle,
          description: newDescription,
        });
        onTaskUpdated(updatedTask);
        toast.success("Tarefa atualizada com sucesso!");
      } catch (error) {
        console.error("Failed to update task", error);
        toast.error("Falha ao atualizar a tarefa.");
      }
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Você tem certeza que deseja excluir esta tarefa?")) {
      try {
        await tasksService.deleteTask(taskId);
        onTaskDeleted(taskId);
        toast.success("Tarefa excluída com sucesso!");
      } catch (error) {
        console.error("Failed to delete task", error);
        toast.error("Falha ao excluir a tarefa.");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks?.map((task) => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {task.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {task.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TaskStatusButton status={task.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEdit(task)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => handleDelete(task.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
