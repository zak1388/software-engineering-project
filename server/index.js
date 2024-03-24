const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const UserModel = require("./models/User.ts")
const EmployeeModel = require("./models/Employee.ts")
const EmployeeTeamModel = require("./models/EmployeeTeam.ts")
const TeamModel = require("./models/Team.ts")
const TeamChatMessageModel = require("./models/TeamChatMessage.ts");
const DirectChatMessageModel = require("./models/DirectChatMessage.ts");

const app = express()

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
    const { username, password } = req.body;
    if (!username) {
        res.status(400).json("Missing username");
        return;
    }
    
    EmployeeModel.findOne({username: username})
    .then((user) => {
        if (user === null) {
            res.status(401).json("Couldn't find user");
            return;
        }

        if (user.password !== password) {
            res.status(401).json(`Incorrect password`);
            return;
        }

        res.status(200).json({employeeId: user.id});
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

// get teams - zak

// create message - zak

// get messages in team - saif

// get messages from manager - saif

// 


app.listen(8000, () => {
    console.log("server started")
})
