import "./App.css";
import React, { useState, useEffect } from "react";

function Task({ task, onDelete, onToggle }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.name}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
}

function AddTask({ onAdd }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    onAdd(inputValue);
    setInputValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Add new Task</label>
      <br />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(taskName) {
    const newTask = { id: Date.now(), name: taskName, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function deleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function toggleTask(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
}

export default App;
