const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    date_of_birth: Date,
    email: String,
    personal_number: String,
    emergency_number: String,
    holiday_days: Number,
    office_location: String,
    gender: String,
    position: String,
    address: String,
    user: {type: Schema.Types.ObjectId, ref: "User"},
    buddy: {type: Schema.Types.ObjectId, ref: "Employee"},
    dashboardModel: {
        type: {
            component1: true,
            component2: true
        },
    }

})

module.exports = mongoose.model("Employee", EmployeeSchema);
