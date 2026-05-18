// A plain helper module — no JSX, so it's a .js file, not .jsx.
// `export` makes loadTodos importable from other files.
export function loadTodos() {
  console.log("READING storage");
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
}
