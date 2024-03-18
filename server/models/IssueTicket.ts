const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueTicketSchema = new Schema({
    resolved: Boolean,
    description: String,
    creator: {type: Schema.Types.ObjectId, ref: "User"},
})

module.exports = mongoose.model("IssueTicket", IssueTicketSchema);
