import React, { useState } from "react";
import tasksService from "../services/tasksService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const taskData = { title, description };
      const newTask = await tasksService.createTask(taskData);
      
      setTitle("");
      setDescription("");
      toast.success("Tarefa criada com sucesso!");
    } catch (error) {
      console.error("Failed to create task", error);
      toast.error("Tarefa não pode ser criada");
      toast.error("Falha ao criar a tarefa.");
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md md:w-1/2">
      <h2 className="text-lg font-semibold mb-2">+ Criar Tarefa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Criar
        </button>
      </form>
    </div>
  );
}
