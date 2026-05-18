// One component per file. `export default` = "this file's main thing".
// No `import React` needed — modern JSX transform handles it.
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input type="checkbox" checked={todo.done} onChange={onToggle} />
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {" "}
        {todo.value}{" "}
      </span>
      <button onClick={onDelete}> x </button>
    </li>
  );
}
