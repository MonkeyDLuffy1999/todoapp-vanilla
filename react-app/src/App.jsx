import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";
import { loadTodos } from "./storage.js";

// The component main.jsx mounts. Vite convention: the root component is App.
export default function App() {
  console.log("RENDER");
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    console.log("SAVING to storage");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <main>
      <h1>My Todos</h1>
      <TodoForm
        onAdd={(text) =>
          setTodos([
            ...todos,
            { id: crypto.randomUUID(), value: text, done: false },
          ])
        }
      />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => {
              setTodos(
                todos.map((t) =>
                  t.id === todo.id ? { ...t, done: !t.done } : t
                )
              );
            }}
            onDelete={() => {
              setTodos(todos.filter((t) => t.id !== todo.id));
            }}
          />
        ))}
      </ul>
    </main>
  );
}
