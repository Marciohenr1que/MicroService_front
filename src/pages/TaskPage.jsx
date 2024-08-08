import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TaskTable from "../components/TaskTable";
import CreateTaskForm from "../components/CreateTaskForm";
import WebScrapingForm from "../components/WebScrapingForm";
import Header from "../components/Header";
import tasksService from "../services/tasksService";
import WebScrappingTable from "../components/WebScrappingTable";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser({ name: storedUser });
      }

      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await tasksService.getTasks();
          setTasks(response);
        }
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header user={user} onLogout={handleLogout} />
      <main className="p-8 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold md:py-10 py-5">Tarefas</h1>
            <div className="md:flex md:container gap-10 space-y-10 md:space-y-0">
              <CreateTaskForm />
              <WebScrapingForm  />
            </div>
          </div>
          <TaskTable
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
          <WebScrappingTable />
        </div>
      </main>
    </div>
  );
}
