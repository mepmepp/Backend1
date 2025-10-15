
const { request } = require('express');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

var tasks = [];

const main = () => {
    app.get('/', (request, response) => response.send(getTasks()));
    app.get('/tasks', (request, response) => response.send(getTasks()));
    listenToPort();
}

/////////////
// CLASSES //
/////////////

class Task {

    constructor(title, description, isDone) {
        this.title =  title;
        this.description = description;
        this.isDone = isDone;
    }
}

///////////////
// FUNCTIONS //
///////////////


const getTasks = () => {
    if (tasks.length === 0) return "<h1>No tasks available</h1>";
    const tasksToReturn = "";

    tasks.forEach((task) => {
        const isDone = task.isDone;

        if (isDone === true) isDone = "Task done.";
        else if (isDone === false) isDone = "Task not done yet.";

        const tempTask = `<h1>Todo-App</h1>
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <p>${isDone}</p>`;
        
        taskToReturn += tempTask;
    });

    return taskToReturn;
}

const createNewTask = () => {
    app.post('/new-task', (request, response) => {
        let { title, description, isDone } = request.body;
        const task = new Task(title, description, isDone);
        tasks.push(task); 
    });
}

const updateTask = () => {
    app.post('/update-task/:id', (request, response) => {
        // permet de mettre à jour une tache spécifique
    });
}

const deleteTask = () => {
    app.post('/delete-task/:id', (request, response) => {
        // permet de supprimer une tache specifique
    });
}

const listenToPort = () => {
    app.listen(port, () => {
        console.log(`Todo-App listening on port ${port}`);
    });
}


main();