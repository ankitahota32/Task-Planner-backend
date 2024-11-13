const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ankitahota3264:QEtTNQIA05kHrBca@task-planner.d836z.mongodb.net/?retryWrites=true&w=majority&appName=Task-Planner")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
    })


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User

