// const mongoose = require("mongoose")
import mongoose from 'mongoose'
mongoose.connect("mongodb+srv://ankitahota3264:TaskaPlan2024mmSecure@task-planner.d836z.mongodb.net/?retryWrites=true&w=majority&appName=Task-Planner")
    //mongodb+srv://ankitahota3264:TaskaPlan2024mmSecure@task-planner.d836z.mongodb.net/?retryWrites=true&w=majority&appName=Task-Planner
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
// module.exports = User
export default User

