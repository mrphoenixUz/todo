import { elTodoForm, elTodoTemplate, elTodosParent } from "./html-selection.js";

function saveTodos() {
    const todos = Array.from(elTodosParent.children).map((todo) => ({
        title: todo.querySelector("#todoTitle").textContent,
        body: todo.querySelector("#todoBody").textContent,
        completed: todo.querySelector("#todoCheckbox").checked,
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.forEach((todo) => {                           
        const element = elTodoTemplate.content.cloneNode(true);
        element.getElementById("todoTitle").textContent = todo.title;
        const todoBodyEL = element.getElementById("todoBody");
        todoBodyEL.textContent = todo.body;
        const checkbox = element.getElementById("todoCheckbox");
        checkbox.checked = todo.completed;
        if (todo.completed) {
            todoBodyEL.classList.add("line-through", "opacity-70");
        }
        checkbox.onchange = (e) => {
            if (e.target.checked) {
                todoBodyEL.classList.add("line-through", "opacity-70");
            } else {
                todoBodyEL.classList.remove("line-through", "opacity-70");
            }
            saveTodos();
        };
        element.getElementById("deleteTodo").onclick = (e) => {
            const todoElement = e.target.closest("li");
            todoElement.remove();
            saveTodos();
        };
        elTodosParent.appendChild(element);
    });
}

loadTodos();

elTodoForm.onsubmit = function (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const todoName = data.get("todoName");
    const todoBody = data.get("todoBody");
    const todoTitleInput = elTodoForm.querySelector("[name='todoName']");
    const errorElement = todoTitleInput.nextElementSibling;

    // Clear previous error message
    errorElement.textContent = "";

    // Validation: Check if todoName is empty
    if (!todoName.trim()) {
        errorElement.textContent = "Topshiriq nomini kiritishingiz kerak.";
        errorElement.classList.add("text-red-500", "text-sm");
        return;
    }

    const element = elTodoTemplate.content.cloneNode(true);
    element.getElementById("todoTitle").textContent = todoName;
    const todoBodyEL = element.getElementById("todoBody");
    todoBodyEL.textContent = todoBody;
    element.getElementById("todoCheckbox").onchange = (e) => {
        if (e.target.checked) {
            todoBodyEL.classList.add("line-through", "opacity-70");
        } else {
            todoBodyEL.classList.remove("line-through", "opacity-70");
        }
        saveTodos();
    };
    element.getElementById("deleteTodo").onclick = (e) => {
        const todoElement = e.target.closest("li");
        todoElement.remove();
        saveTodos();
    };

    elTodosParent.appendChild(element);
    saveTodos();
    e.target.reset();
};
