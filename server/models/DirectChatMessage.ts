const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectChatMessageSchema = new Schema({
})

module.exports = mongoose.model("DirectChatMessage", DirectChatMessageSchema);
