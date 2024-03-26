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
    buddy: {type: Schema.Types.ObjectId, ref: "Employee"},
    dashboard_model: {
        components_list: {
            company_updates: {
                type: Boolean,
            },
            next_leave_scheduled: {
                type: Boolean,
            },
            admin_updates: {
                type: Boolean,
            },
            team_chat: {
                type: Boolean,
            },
            calendar: {
                type: Boolean,
            },
            days_off: {
                type: Boolean,
            }, 
            team_updates: {
                type: Boolean,
            }
        },
    }

})

module.exports = mongoose.model("Employee", EmployeeSchema);
