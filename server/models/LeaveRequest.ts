const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveRequestSchema = new Schema({
})

module.exports = mongoose.model("LeaveRequest", LeaveRequestSchema);
