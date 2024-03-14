const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeTeamSchema = new Schema({
    team_id: {type: Schema.Types.ObjectId, ref: "Team"},
    employee_id: {type: Schema.Types.ObjectId, ref: "Employee"},
    is_manager: Boolean
})

module.exports = mongoose.model("EmployeeTeam", EmployeeTeamSchema);
