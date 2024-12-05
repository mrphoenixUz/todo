import { useState } from "react";
import { toast } from "react-toastify";

const AddTodo = ({ onAdd }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleAdd = () => {
    if (!todoTitle.trim()) {
      toast.warn("Todo title cannot be empty!", {
        position: "top-center",
      });
      return;
    }
    onAdd(todoTitle);
    setTodoTitle("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        className="flex-grow shadow-sm p-2 border rounded-md"
        placeholder="Enter your todo..."
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
