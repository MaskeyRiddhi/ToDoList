import { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css"; // Ensure this import is correct

function Todo({ theme }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch Todos
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos").then((res) => setTodos(res.data));
  }, []);

  // Add Todo
  const addTodo = () => {
    axios.post("http://localhost:5000/api/todos", { text: newTodo }).then((res) => {
      setTodos([...todos, res.data]);
      setNewTodo("");
    });
  };

  // Toggle Complete
  const toggleComplete = (id, completed) => {
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed }).then((res) => {
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    });
  };

  // Delete Todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  // Edit Todo
  const editTodo = (id, text) => {
    setEditingTodo(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    axios.put(`http://localhost:5000/api/todos/${id}`, { text: editingText }).then((res) => {
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setEditingTodo(null);
      setEditingText("");
    });
  };

  return (
    <div className={`todo-container ${theme}`}>
      <h1 className="todo-title">To-Do List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task..."
          className="todo-input"
        />
        <button onClick={addTodo} className="todo-add-button">Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={todo._id} className="todo-item">
            <span className="todo-number">{index + 1}. </span>
            {editingTodo === todo._id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="todo-edit-input"
                />
                <button onClick={() => saveEdit(todo._id)} className="todo-save-button">Save</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleComplete(todo._id, todo.completed)}
                  style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
                  className="todo-text"
                >
                  {todo.text}
                </span>
                <button onClick={() => editTodo(todo._id, todo.text)} className="todo-edit-button">✏️</button>
              </>
            )}
            <button onClick={() => deleteTodo(todo._id)} className="todo-delete-button">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
