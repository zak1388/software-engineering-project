const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveResponseSchema = new Schema({
})

module.exports = mongoose.model("LeaveResponse", LeaveResponseSchema);
