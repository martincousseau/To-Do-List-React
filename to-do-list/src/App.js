import "./App.css";
import React, { useState } from "react";

function Task({ taskNumber, onDelete }) {
  return (
    <div>
      <li>I'm task number: {taskNumber}</li>
      <button onClick={() => onDelete(taskNumber)}>Delete</button>
    </div>
  );
}

function TaskList({ tasks, onDelete }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <Task key={index} taskNumber={task} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function AddTask({ onAdd }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    onAdd(inputValue); // Envoie la nouvelle tâche au parent (App)
    setInputValue(""); // Réinitialise l'input après ajout
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
  const [tasks, setTasks] = useState([]); // État qui stocke la liste des tâches

  function addTask(taskName) {
    setTasks((prevTasks) => [...prevTasks, taskName]); // Mise à jour correcte du state
  }

  function deleteTask(taskToDelete) {
    setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
