const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const UsersModel = require("./models/User.ts")


const app = express()

mongoose.connect("mongodb+srv://zak:ECS506@cluster0.3ranwb2.mongodb.net/", {

}).then((response) => {
    if(response){
        console.log("db connected")
    }
})

app.post("/api/login", async(req, res) => {
    
})

app.use(cors())

app.listen(8000, () => {
    console.log("server started")
})