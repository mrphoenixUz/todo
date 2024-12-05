import { useState, useEffect } from "react";
import AddTodo from "./Components/AddTodo";
import TodoList from "./Components/TodoList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    setTodos([...todos, { id: Date.now(), title, completed: false }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="bg-gray-100 mx-auto p-4 todo-container">
      <h1 className="font-bold text-2xl text-center">Todo App</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onComplete={completeTodo}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
