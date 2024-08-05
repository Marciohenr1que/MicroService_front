import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/tasks', {
        title,
        description,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskCreated(response.data.task);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2">+ Criar Tarefa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
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