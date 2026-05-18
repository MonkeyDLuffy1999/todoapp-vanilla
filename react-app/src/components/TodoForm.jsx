// Each file imports exactly the hooks it uses, by name, from "react".
import { useState } from "react";

export default function TodoForm({ onAdd }) {
  // Draft text lives here — only this component needs it.
  const [todoText, setTodoText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd(todoText);
          setTodoText("");
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
