const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const EmployeeModel = require("./models/Employee.ts")

const app = express()

// TODO: ask saif to allow this anywhere
// also i think all the stuff i did with models was pointless again, dont remember why, we can just put objects in the db and some of them just dont need to be there (ie not models)
mongoose.connect("mongodb+srv://zak:ECS506@cluster0.3ranwb2.mongodb.net/", {

}).then((response) => {
    if(response){
        console.log("db connected")
    }
})

app.use(cors())
app.use(express.json());

app.get("/api/login", async(req, res) => {
    const { username, password } = req.query;
    console.log(username, password)

    try{
        const user = await EmployeeModel.findOne({ username: username, password: password })
        res.send(user)
    } catch(err){
        console.log(err)
        res.send(err)
    }

});

// filter components in home
app.post("/api/filterHomeComponents", async(req, res) => {
    const { userId, components } = req.body;

    try{
        const response = await EmployeeModel.updateOne({ userId: userId }, { dashboardModel: components })
        res.send(response)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

// get teams

// create message

// get messages in team

// get messages from manager


app.listen(8000, () => {
    console.log("server started")
})
