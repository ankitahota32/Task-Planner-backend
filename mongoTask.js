const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ankitahota3264:QEtTNQIA05kHrBca@task-planner.d836z.mongodb.net/?retryWrites=true&w=majority&appName=Task-Planner")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
    })


const TaskSchema = new mongoose.Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    task: {
        type: String,

    }
})

const Task = mongoose.model("Task", TaskSchema)
module.exports = Task

