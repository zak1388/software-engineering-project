const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveRequestSchema = new Schema({
    start: Date,
    end: Date,
    comment: String,
    active: Boolean,
    proof: String,
    requestor: {type: Schema.Types.ObjectId, ref: "Employee"},
    type: String,
})

module.exports = mongoose.model("LeaveRequest", LeaveRequestSchema);
