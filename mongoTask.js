const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ankitahota3264:ankita123@cluster0.d836z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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

