const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const EmployeeModel = require("./models/Employee.ts")
const EmployeeTeamModel = require("./models/EmployeeTeam.ts")
const TeamModel = require("./models/Team.ts")
const TeamChatMessageModel = require("./models/TeamChatMessage.ts");
const DirectChatMessageModel = require("./models/DirectChatMessage.ts");
const LeaveRequestModel = require("./models/LeaveRequest.ts");
const LeaveResponseModel = require("./models/LeaveResponse.ts");

require("dotenv").config();
const app = express()

mongoose.connect("mongodb+srv://zak:ECS506@cluster0.3ranwb2.mongodb.net/", {

}).then((response) => {
    if(response){
        console.log("db connected")
    }
})

app.use(cors())
app.use(express.json());

app.post("/api/login", async(req, res) => {
    const { username, password } = req.body.params;
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

        res.status(200).json(user);
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
app.post("/api/GetTeams", async(req, res) => {
    const { userId } = req.body;

    try {
        const empTeams = await EmployeeTeamModel.find({ userId: userId });
        const teams = [];

        for (let i = 0; i < empTeams.length; i++) {
            const team = await TeamModel.find({ id: empTeams[i].id });
            teams.push(team);
        }

        res.send(teams);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

// create message - zak
// Team Chat
app.post("/api/CreateTeamMessage", async(req, res) => {
    const { userId, teamId, message } = req.body;

    try {
        const message = new TeamChatMessageModel({
            sent_at:  Date.now(), // TODO: should this be done on the server, no spoofing but might mismatch client
            message: message,
            sender: userId,
            team: teamId
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})
// Direct Chat Message
app.post("/api/CreateDirectMessage", async(req, res) => {
    const { fromUserId, message, toUserId } = req.body;

    try {
        const message = new DirectChatMessageModel({
            sent_at: Date.now(),
            message: message,
            from_employee: fromUserId,
            to_employee: toUserId,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// get messages - zak
// get team messages
app.post("/api/GetTeamMessages", async(req, res) => {
    const { teamId } = req.body;

    try {
        const messages = await TeamChatMessageModel.find({ team: teamId });
        res.json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// get ALL direct messages
app.post("/api/GetAllDirectMessages", async(req, res) => {
    const { id } = req.body;

    try {
        const employee = await EmployeeModel.findOne({ id });
        const messages = await DirectChatMessageModel.find({ from_employee: employee });
        res.json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// get all leave requests
app.post("/api/GetLeaveRequests", async(req, res) => {
    const { id } = req.body;

    try {
        const employee = await EmployeeModel.findOne({ id });
        const leave_reqs = await LeaveRequestModel.find({ requestor: employee })
        res.json(leave_reqs);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// get all responses for employee
app.post("/api/GetLeaveResponses", async(req, res) => {
    const { id } = req.body;

    try {
        const employee = await EmployeeModel.findOne({ id });
        const leave_reqs = await LeaveRequestModel.find({ requestor: employee })
        const leave_resps_promises = leave_reqs.map(leave_req => LeaveResponseModel.findOne({ request: leave_req }));
        const leave_resps = await Promise.all(leave_resps_promises);
        res.json(leave_resps);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// get response for leave request
app.post("/api/GetLeaveResponseFor", async(req, res) => {
    const { requestId } = req.body;

    try {
        const leave_resps = await LeaveResponseModel.find({ request: requestId });
        res.json(leave_resps);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/api/GetHolidayDays", async(req, res) => {
    try {
        const holidayDays = process.env.HOLIDAY_DAYS;
        res.json(holidayDays);
    } catch (err) { 
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/api/GetSickDays", async(req, res) => {
    try {
        const sickDays = process.env.SICK_DAYS;
        res.json(sickDays);
    } catch (err) { 
        console.log(err);
        res.status(500).send(err);
    }
});

// create message

// get messages in team

// get messages from manager


app.listen(8000, () => {
    console.log("server started")
})
