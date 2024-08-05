import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskTable from '../components/TaskTable';
import CreateTaskForm from '../components/CreateTaskForm';
import WebScrapingForm from '../components/WebScrapingForm';
import Header from '../components/Header';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data and tasks
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data.tasks);
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header user={user} onLogout={handleLogout} />
      <main className="p-8 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Tarefas</h1>
            <div className="flex space-x-4">
              <CreateTaskForm onTaskCreated={task => setTasks([...tasks, task])} />
              <WebScrapingForm onTaskCreated={task => setTasks([...tasks, task])} />
            </div>
          </div>
          <TaskTable tasks={tasks} />
        </div>
      </main>
    </div>
  );
}
