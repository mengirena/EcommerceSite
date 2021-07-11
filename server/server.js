const cors = require("cors")
const express = require("express")
//todo: add stripe key
const stripe = require("stripe")("")
const { v4: uuid } = require("uuid")

const app = express()

//middleware
app.use(express.json())
app.use(cors()) //for cross object references 

//routes
app.get("/", (req, res) => {
    res.send("works")
})

//listening
app.listen(8282, ()=>{
    console.log("running on 8282")
})