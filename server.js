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

app.post("/", async (req, res) => {
    const { email, password } = req.body
    
    try {
        const check = await User.findOne({ email: email }) 
        
        if (check) {
            res.json("exist")
        }
        else {
            res.json("Does not exist")
        }
    }
    catch {
        res.json("Does not exist");
    }
})

    app.post("/signup", async (req, res) => {
    const { email, password } = req.body

        const data = {
            email: email,
            password:password
    }
    
    try {
        const check = await User.findOne({ email: email }) 
        
        if (check) {
            res.json("exist")
        }
        else {
            await User.insertMany([data])
            res.json("User created successfully");
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
    })

app.post("/home", async (req, res) => {
    const { task } = req.body;
    
    const data = {
        task: task
    }
    try {
        const task = await Task.insertMany([data]);
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(8000,
    console.log("Server Started On PORT 8000")); 