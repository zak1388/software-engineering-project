const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamChatMessageSchema = new Schema({
    sent_at: Date,
    message: String,
    sender: {type: Schema.Types.ObjectId, ref: "Employee"},
    team: {type: Schema.Types.ObjectId, ref: "Team"},
})

module.exports = mongoose.model("TeamChatMessage", TeamChatMessageSchema);
