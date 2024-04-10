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
const IssueTicketModel = require("./models/IssueTicket.ts");
const ChangeRequestModel = require("./models/ChangeRequest.ts");
const AdminNoticeModel = require("./models/AdminNotice.ts");
const ManagerNoticeModel = require("./models/ManagerNotice.ts");
const EventModel = require("./models/Event.ts")
const moment = require("moment")


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

app.get("/api/getProfile", async(req, res) => {
    const { userId } = req.query;
    // console.log(userId)

    try{
        const user = await EmployeeModel.findOne({ _id: userId })
        res.send(user)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

app.post("/api/updateProfile", async(req, res) => {
    const { userId, first_name, last_name, email, address, personal_number, emergency_number } = req.body;

    try{
        const response = await EmployeeModel.updateOne({_id: userId}, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            address: address,
            personal_number: personal_number,
            emergency_number: emergency_number
        })

        res.send(response)
    } catch(err){
        console.log(err)
        res.send(err)
    }

})

// filter components in home
app.post("/api/filterHomeComponents", async(req, res) => {
    const { userId, components_list } = req.body;
    console.log(components_list)

    try{
        const response = await EmployeeModel.updateOne({ _id: userId }, { dashboard_model: {
            components_list: components_list
        } })
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
    const { firstName, lastName, sent_at, message, userId, teamId } = req.body;
    // console.log(req.body)

    try {
        const newMessage = await new TeamChatMessageModel({
            first_name: firstName,
            last_name: lastName,
            sent_at:  sent_at,
            message: message,
            sender: userId,
            team: teamId
        });
        // console.log(newMessage)
        newMessage.save()
        res.send(newMessage)
    } catch (err) {
        console.log(err);
        res.send(err);
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
app.get("/api/GetTeamMessages", async(req, res) => {
    const { teamId } = req.query;
    // console.log(teamId)

    try {
        const messages = await TeamChatMessageModel.find({ team: teamId });
        res.send(messages);
        // console.log(messages)
    } catch (err) {
        console.log(err);
        res.send(err);
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
    const { userId } = req.body.params;

    try {
        const employee = await EmployeeModel.findOne({ _id: userId });
        const leave_reqs = await LeaveRequestModel.find({ requestor: employee })
        res.json(leave_reqs);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/api/GetLeaveRequestsForTeam", async(req, res) => {
    const { userId, teamIds } = req.body.params;

    // TODO: validation

    try {
        const employees_teams = (await Promise.all(teamIds.map(teamId => EmployeeTeamModel.find({ team_id: teamId })))).flat();
        const employeeIds = employees_teams.map(empteam => empteam.employee_id);
        const nested_leave_reqs = await Promise.all(employeeIds.map(empId => LeaveRequestModel.find({ requestor: empId })));
        const leave_reqs = nested_leave_reqs.flat();
        res.json(leave_reqs);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/api/CreateLeaveRequest", async(req, res) => {
    const { id, start, end, type, comments, proof } = req.body.params;

    try {
        const employee = await EmployeeModel.findOne({ _id: id });
        new LeaveRequestModel({
            start: start,
            end: end,
            comment: comments,
            state: "Active",
            proof: proof,
            requestor: employee,
            type: type,
        }).save();
        res.send("ok");
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

// get employees
app.get("/api/getEmployees", async(req, res) => {
    
    try{
        const data = await EmployeeModel.find({})
        res.send(data)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

// add employee

app.post("/api/addEmployee", async(req, res) => {
    const { 
        firstName, 
        lastName, 
        username, 
        password, 
        email, 
        dateOfBirth, 
        gender, 
        officeLocation, 
        personalNumber, 
        emergencyNumber, 
        position, 
        address, 
        holidayDays } = req.body;

    try{
        const employee = await new EmployeeModel({
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            email: email,
            date_Of_birth: dateOfBirth,
            gender: gender,
            office_location: officeLocation,
            personal_number: personalNumber,
            emergency_number: emergencyNumber,
            position: position,
            address: address,
            holiday_days: holidayDays,
            dashboard_model: {
                components_list: {
                    company_updates: true,
                    next_leave_scheduled: true,
                    admin_updates: true,
                    team_chat: true,
                    calendar: true,
                    days_off: true,
                    team_updates: true
                }
            }

        })

        employee.save()
        res.send(employee)

    } catch(err){
        console.log(err)
        res.send(err)
    }
})

app.post("/api/GetEmployeeById", async(req, res) => {
    const { userId } = req.body.params;

    try {
        const employee = await EmployeeModel.findOne({ _id: userId });
        if (employee) res.json(employee);
        else res.status(404).json({msg: "not found"});
    } catch (err) { 
        console.log(err);
        res.status(500).send(err);
    }
});

// create calendar event

app.post("/api/createEvent", async(req, res) => {
    const { userId, start, end, title } = req.body;
    console.log(req.body)

    try{
        const event = await new EventModel({
            userId: userId,
            start: start,
            end: end,
            title: title
        })

        event.save()
        res.send(event)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

// get events

app.get("/api/getEvents", async(req, res) => {
    const { userId, start, end } = req.query

    try{
        const events = await EventModel.find({userId: userId, start: {$gte: moment(start).toDate()}, end: {$lte: moment(end).toDate()}})
        res.send(events)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

app.post("/api/CreateIssue", async(req, res) => {
    const { userId, brief, fullText } = req.body.params;

    try {
        await (new IssueTicketModel({
            resolved: false,
            brief,
            fullText,
            createdAt: new Date(),
            creator: userId,
        })).save();
        res.send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/api/DeleteIssue", async(req, res) => {
    const { userdId, issueId } = req.body.params;

    // TODO: verify uid is an admin

    try {
        await IssueTicketModel.deleteOne({ _id: issueId });
        res.send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/api/DeleteLeaveRequest", async(req, res) => {
    const { userdId, requestId } = req.body.params;

    // TODO: verify uid is requst owner

    try {
        await LeaveRequestModel.deleteOne({ _id: requestId });
        res.send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/api/GetIssues", async(req, res) => {
    const { userId } = req.body.params;

    // TODO: verify uid is an admin

    try {
        const issues = await IssueTicketModel.find();
        res.send(issues);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/api/GetChangeRequests", async(req, res) => {
    const { userId } = req.body.params;

    // TODO: verify uid is an admin

    try {
        const changeReqs = await ChangeRequestModel.find() || [];
        res.send(changeReqs);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get("/api/getUsersTeams", async(req, res) => {
    const { userId } = req.query;

    try{
        const teams = await EmployeeTeamModel.find({ employee_id: userId })
        res.send(teams)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

// create team

app.post("/api/createTeam", async(req, res) => {
    const { name } = req.body;

    try{
        const team = await new TeamModel({
            name: name
        })

        team.save()
        res.send(team)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

//get all teams

app.get("/api/getTeams", async(req, res) => {

    try{
        const teams = await TeamModel.find({})
        res.send(teams)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

// add member to team

app.post("/api/addMember", async(req, res) => {
    const { employeeId, teamId } = req.body;

    try{
        const teamMember = await new EmployeeTeamModel({
            team_id: teamId,
            employee_id: employeeId
        })

        teamMember.save()
        res.send(teamMember)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

// check if member is added

app.get("/api/checkMemberAdded", async(req, res) => {
    const { employeeId, teamId } = req.query;

    try{
        const response = await EmployeeTeamModel.find({ employee_id: employeeId, team_id: teamId })
        res.send(response)
    } catch(err){
        console.log(err)
        res.send(err)
    }

})

// get members from team

app.get("/api/getTeamMembers", async(req, res) => {
    const { teamId } = req.query;

    
    try{
        const response = await EmployeeTeamModel.find({ team_id: teamId })
        res.send(response)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

// remove member from team
// Create notice

app.post("/api/createNotice", async(req, res) => {
    const { type, title, mainText, urgent, date, creator, team } = req.body;

    try{
        const notice = await new NoticeModel({
            type: type,
            title: title,
            main_text: mainText,
            urgent: urgent,
            daate: date,
            creator: creator,
            team: team
        })

        notice.save()
        res.send(notice)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

// Get notices

app.get("/api/getNotices", async(req, res) => {
    const { teamId } = req.query;

    try{
        const adminNotices = await NoticeModel.find({ type: "admin" })
        const managerNotices = await NoticeModel.find({ type: "manager", team: teamId })

        res.send({adminNotices, managerNotices})
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

app.post("/api/UpdateChangeRequest", async(req, res) => {
    const { userId, requestId, newState } = req.body.params;

    // TODO: verify uid admin

    try {
        const changeReq = await ChangeRequestModel.findOne({ _id: requestId });
        changeReq.state = newState;
        await changeReq.save();
        res.json();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

});

app.post("/api/UpdateLeaveRequest", async(req, res) => {
    const { userId, requestId, newState } = req.body.params;

    // TODO: verify uid manager

    try {
        const LeaveReq = await LeaveRequestModel.findOne({ _id: requestId });
        LeaveReq.state = newState;
        await LeaveReq.save();
        res.json();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

});

app.post("/api/AdminPostNotice", async(req, res) => {
    const { userId, title, notice, urgent } = req.body.params;

    // TODO: verify uid admin

    try {
        const adminNotice = new AdminNoticeModel({
            title, 
            notice, 
            urgent, 
            creator: userId,
            createdAt: Date.now(),
        });
        await adminNotice.save();
        res.json();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

});

app.listen(8000, () => {
    console.log("server started")
})
