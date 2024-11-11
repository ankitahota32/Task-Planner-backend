const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Task-Planner")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
})


const TaskSchema = new mongoose.Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    task: {
        type: String,
        
    }
})

const Task = mongoose.model("Task", TaskSchema)
module.exports = Task

