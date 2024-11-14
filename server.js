const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./mongoUser");
const Task = require("./mongoTask");



const app = express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", cors(), (req, res) => {
    res.send("Server is running");
})


// app.use(cors({
//   origin: 'https://tasky-planner.netlify.app/',
//   methods: 'GET,POST,OPTIONS,PUT,DELETE', 
//   allowedHeaders: 'Content-Type,Authorization',
// }));

// app.get("/", (req, res) => {
//     res.send("Welcome to Task Planner API!");
// });


app.post("/", async (req, res) => { //Login API

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            res.json({ status: "exist", userId: user._id })// change made here
        }
        else {
            res.json({ status: "Does not exist" })
        }
    }
    catch {
        res.json({ status: "Does not exist" });
    }
})

app.post("/signup", async (req, res) => { //SignUp API

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            res.json({ status: "exist" });// change made here
        }
        else {
            const newUser = await User.create({ email: email, password: password })
            res.json({ status: "Does not exist", userId: newUser._id });//change made here
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
})

app.post("/AddTask", async (req, res) => { //Add-Task API
    const { task, User_id } = req.body;
    if (!task || !User_id) {
        res.json({ message: "User_id is required" });
    }
    const data = {
        task: task,
        User_id: User_id
    };
    try {
        const newTask = await Task.create(data);
        res.json(newTask);
    }
    catch (error) {
        res.json({ message: "Internal server error" });
    }
});

app.get("/AddTask/get-task", async (req, res) => { //Task List API 
    const userId = req.headers["user-id"];

    if (!userId) {
       return res.json({ message: "User Id is required in headers" });
    }
    try {
        const tasks = await Task.find({ User_id: userId });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving tasks" });
    }
});

app.delete("/AddTask/:id", async (req, res) => {// Delete API
    const taskId = req.params.id;

    try {
        const deleteTask = await Task.findByIdAndDelete(taskId);
        if (!deleteTask) {
            return res.json({ message: "Task not found" });
        }
        return res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal Server Error" });
    }
});

app.put("/AddTask/:id", async (req, res) => { //Update API
    try {
        const editTask = await Task.findByIdAndUpdate(
            req.params.id,
            { task: req.body.task },
            { new: true }
        );
        res.json(editTask);
    } catch (error) {
        res.json({ message: error.message });
    }
});

app.put("/AddTask/:id", async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { task },
            { new: true }
        );

        if (!updatedTask) {
            return res.json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.json({ message: 'Failed to update task' });
    }
})




// const PORT = process.env.PORT || 8000;
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server running on port ${PORT}`);
// });

app.listen(8000, () => {
    console.log("Server is running")
})