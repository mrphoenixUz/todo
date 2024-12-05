import { useState } from "react";

const TodoItem = ({ todo, onDelete, onEdit, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    if (!editedTitle.trim()) return;
    onEdit(todo.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex justify-between items-center p-3 border-b ${
        todo.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          className="flex-grow shadow-sm p-2 border rounded-md"
          autoFocus
        />
      ) : (
        <span
          className={`flex-grow ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
          onClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-yellow-500 hover:text-yellow-600"
        >
          ✏️
        </button>
        <button
          onClick={onComplete}
          className="text-green-500 hover:text-green-600"
        >
          ✅
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
