const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const UserModel = require("./models/User.ts")
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
app.use(bodyParser.urlencoded());

app.post("/api/login", async(req, res) => {
    if (!req.body.username) {
        res.status(400).json("Missing username");
        return;
    }
    
    EmployeeModel.find({username: req.body.username})
    .then((users) => users[0])
    .then((user) => {
        if (user.password !== req.body.password) {
            res.status(401).json(`Incorrect password`);
            return;
        }

        res.status(200).json({token: "TODO"}); //TODO: JWT or something ig
    })
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

// 


app.listen(8000, () => {
    console.log("server started")
})
