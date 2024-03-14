const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamChatMessageSchema = new Schema({
})

module.exports = mongoose.model("TeamChatMessage", TeamChatMessageSchema);
