const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueTicketSchema = new Schema({
})

module.exports = mongoose.model("IssueTicket", IssueTicketSchema);
