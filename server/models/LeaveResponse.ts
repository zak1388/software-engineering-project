const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveResponseSchema = new Schema({
    approved: Boolean,
    comment: String,
    manager: {type: Schema.Types.ObjectId, ref: "Employee"},
    request: {type: Schema.Types.ObjectId, ref: "LeaveRequest"},
})

module.exports = mongoose.model("LeaveResponse", LeaveResponseSchema);
