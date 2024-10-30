const express = require("express");
const dotenv = require("dotenv");
const collection = require("./mongo")
const cors = require("cors")


const app = express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", cors(), (req, res) => {
    
})

app.post("/", async (req, res) => {
    const { email, password } = req.body
    
    try {
        const check = await collection.findOne({ email: email }) 
        
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
        const check = await collection.findOne({ email: email }) 
        
        if (check) {
            res.json("exist")
        }
        else {
            res.json("Does not exist")
            await collection.insertMany([data])
        }
    }
    catch {
        res.json("Does not exist");
    }
})


app.listen(8000,
    console.log("Server Started On PORT 8000"));