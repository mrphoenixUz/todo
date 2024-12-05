import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onEdit, onComplete }) => {
  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos yet!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => onDelete(todo.id)}
            onEdit={onEdit}
            onComplete={() => onComplete(todo.id)}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
