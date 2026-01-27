
class TodoList {
    constructor() {
        this.editingIndex = -1;
        this.addButton = document.getElementById('addButton');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');

        this.addButton.addEventListener('click', () => this.addOrUpdateTask());
        this.todoList.addEventListener('click', (e) => this.handleButtonClick(e));  
    }

    addOrUpdateTask() {
        const taskText = this.todoInput.value.trim();
        if (taskText) {
            this.editingIndex === -1 ? this.addTask(taskText) : this.updateTask(taskText);
            this.todoInput.value = '';
            this.resetEditing();
        }
    }

    addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <span class="task-text" style ="width: 50%; font-size: large;">${taskText}</span>
            <span class="timestamp" style="display: block; margin-top: 0.5rem; color: white; font-size: smaller  ; font-style: italic; font-weight: 300;">Date Added: ${new Date().toLocaleDateString()} <br> Time: ${new Date().toLocaleTimeString()}</span>
            <div style="margin-top: 0.5rem; " >
                <button class="btn btn-success btn-sm doneButton">Done</button>
                <button class="btn btn-warning btn-sm editButton">Edit</button>
                <button class="btn btn-danger btn-sm removeButton">Remove</button>
            </div>
        `;
        this.todoList.appendChild(listItem);
    }

    handleButtonClick(e) {
        const action = e.target.classList.contains('doneButton') ? 'done' :
                       e.target.classList.contains('editButton') ? 'edit' :
                       e.target.classList.contains('removeButton') ? 'remove' : null;
        if (!action) return;

        const taskItem = e.target.closest('li');

        if (action === 'done') taskItem.querySelector('.task-text').classList.toggle('completed');
        else if (action === 'edit') this.editTask(taskItem);
        else if (action === 'remove') taskItem.remove();
    }

    updateTask(taskText) {
        this.todoList.children[this.editingIndex].querySelector('.task-text').textContent = taskText;
    }

    editTask(taskItem) {
        this.todoInput.value = taskItem.querySelector('.task-text').textContent;
        this.editingIndex = Array.from(this.todoList.children).indexOf(taskItem);
        this.addButton.textContent = 'Update';
    }

    resetEditing() {
        this.editingIndex = -1;
        this.addButton.textContent = 'Add';
    }
}

document.addEventListener('DOMContentLoaded', () => new TodoList());
