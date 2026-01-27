
let user = prompt("Enter Name:") || "*****";
const demo = document.getElementById("demo").innerText = user;
if (demo) demo.innerText = user;
console.log("User name:", user);






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
            if (!taskText) return;

            if (this.editingIndex === -1) {
                this.addTask(taskText);
                console.log(+"user: "+ user +  " TASK ADDED:", taskText);
            } else {
                this.updateTask(taskText);
                console.log("TASK UPDATED:", taskText);
            }

            this.todoInput.value = '';
            this.resetEditing();
        }

    addTask(taskText) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';

            listItem.innerHTML = `
                <span class="task-text" style="width:50%;font-size:large;">${taskText}</span>
                <span class="timestamp" style="display:block;margin-top:.5rem;color:white;font-size:smaller;font-style:italic;">
                    Date Added: ${new Date().toLocaleDateString()} <br>
                    Time: ${new Date().toLocaleTimeString()}
                </span>
                <div style="margin-top:.5rem;">
                    <button class="btn btn-success btn-sm doneButton">Done</button>
                    <button class="btn btn-warning btn-sm editButton">Edit</button>
                    <button class="btn btn-danger btn-sm removeButton">Remove</button>
                </div>
            `;

            this.todoList.appendChild(listItem);
        }

     handleButtonClick(e) {
            const taskItem = e.target.closest('li');
            if (!taskItem) return;

            const taskTextEl = taskItem.querySelector('.task-text');
            const taskText = taskTextEl.textContent;

            
            if (e.target.classList.contains('doneButton')) {
                console.log("User: "+ user +" TASK DONE:", taskText);

                taskTextEl.classList.add('done');

                
                taskItem.querySelectorAll('button').forEach(btn => btn.remove());
                return;
            }

             
            if (e.target.classList.contains('editButton')) {
                this.editTask(taskItem);
                console.log("User: "+ user +" TASK EDIT:", taskText);
                return;
            }


         if (action === 'edit') {



         }this.editTask(taskItem);
         if (action === 'remove') taskItem.remove();
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
