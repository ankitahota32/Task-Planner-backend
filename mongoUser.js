const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Task-Planner")
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

