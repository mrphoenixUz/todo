import { elTodoForm, elTodoTemplate, elTodosParent } from './html-selection.js'

const MAX_TITLE_LENGTH = 35

function saveTodos () {
  const todos = Array.from(elTodosParent.children).map(todo => ({
    title: todo.querySelector('#todoTitle').textContent,
    body: todo.querySelector('#todoBody').textContent,
    completed: todo.querySelector('#todoCheckbox').checked
  }))
  localStorage.setItem('todos', JSON.stringify(todos))
}

function loadTodos () {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]')
  todos.forEach(todo => {
    const element = elTodoTemplate.content.cloneNode(true)
    const todoTitle = element.getElementById('todoTitle')
    const todoBodyEL = element.getElementById('todoBody')
    const saveButton = element.getElementById('saveTodo')
    const errorText = element.getElementById('errorText')
    const checkbox = element.getElementById('todoCheckbox')
    const deleteButton = element.getElementById('deleteTodo')
    const editButton = element.getElementById('editTodo')

    todoTitle.textContent = todo.title
    todoBodyEL.textContent = todo.body
    checkbox.checked = todo.completed

    if (todo.completed) {
      todoBodyEL.classList.add('line-through', 'opacity-70')
    }

    checkbox.onchange = e => {
      if (e.target.checked) {
        todoBodyEL.classList.add('line-through', 'opacity-70')
      } else {
        todoBodyEL.classList.remove('line-through', 'opacity-70')
      }
      saveTodos()
    }

    deleteButton.onclick = e => {
      const todoElement = e.target.closest('li')
      todoElement.remove()
      saveTodos()
    }

    editButton.onclick = () => {
      todoTitle.contentEditable = 'true'
      todoBodyEL.contentEditable = 'true'
      todoTitle.classList.add('border', 'border-blue-500', 'px-2')
      todoBodyEL.classList.add('border', 'border-blue-500', 'px-2')
      saveButton.classList.remove('hidden')
    }

    saveButton.onclick = () => {
      errorText.classList.add('hidden')
      if (!todoTitle.textContent.trim()) {
        errorText.textContent = "Topshiriq nomini bo'sh qoldira olmaysiz."
        errorText.classList.remove('hidden')
        return
      }

      todoTitle.contentEditable = 'false'
      todoBodyEL.contentEditable = 'false'
      todoTitle.classList.remove('border', 'border-blue-500', 'px-2')
      todoBodyEL.classList.remove('border', 'border-blue-500', 'px-2')
      saveButton.classList.add('hidden')
      saveTodos()
    }

    elTodosParent.appendChild(element)
  })
}

loadTodos()

elTodoForm.onsubmit = function (e) {
  e.preventDefault()
  const data = new FormData(e.target)
  const todoName = data.get('todoName')
  const todoBody = data.get('todoBody')
  const todoTitleInput = elTodoForm.querySelector("[name='todoName']")
  const errorElement = todoTitleInput.nextElementSibling

  errorElement.textContent = ''

  if (!todoName.trim()) {
    errorElement.textContent = 'Topshiriq nomini kiritishingiz kerak.'
    errorElement.classList.add('text-red-500', 'text-sm')
    return
  }
  if (todoName.length > MAX_TITLE_LENGTH) {
    errorElement.textContent = `Topshiriq nomi ${MAX_TITLE_LENGTH} ta belgidan oshmasligi kerak.`
    errorElement.classList.add('text-red-500', 'text-sm')
    return
  }

  const element = elTodoTemplate.content.cloneNode(true)
  const todoTitle = element.getElementById('todoTitle')
  const todoBodyEL = element.getElementById('todoBody')
  const saveButton = element.getElementById('saveTodo')
  const errorText = element.getElementById('errorText')
  const checkbox = element.getElementById('todoCheckbox')
  const deleteButton = element.getElementById('deleteTodo')
  const editButton = element.getElementById('editTodo')

  todoTitle.textContent = todoName
  todoBodyEL.textContent = todoBody

  checkbox.onchange = e => {
    if (e.target.checked) {
      todoBodyEL.classList.add('line-through', 'opacity-70')
    } else {
      todoBodyEL.classList.remove('line-through', 'opacity-70')
    }
    saveTodos()
  }

  deleteButton.onclick = e => {
    const todoElement = e.target.closest('li')
    todoElement.remove()
    saveTodos()
  }

  editButton.onclick = () => {
    todoTitle.contentEditable = 'true'
    todoBodyEL.contentEditable = 'true'
    todoTitle.classList.add('border', 'border-blue-500', 'px-2')
    todoBodyEL.classList.add('border', 'border-blue-500', 'px-2')
    saveButton.classList.remove('hidden')
  }

  saveButton.onclick = () => {
    errorText.classList.add('hidden')
    if (!todoTitle.textContent.trim()) {
      errorText.textContent = "Topshiriq nomini bo'sh qoldira olmaysiz."
      errorText.classList.remove('hidden')
      return
    }

    todoTitle.contentEditable = 'false'
    todoBodyEL.contentEditable = 'false'
    todoTitle.classList.remove('border', 'border-blue-500', 'px-2')
    todoBodyEL.classList.remove('border', 'border-blue-500', 'px-2')
    saveButton.classList.add('hidden')
    saveTodos()
  }

  elTodosParent.appendChild(element)
  saveTodos()
  e.target.reset()
}
