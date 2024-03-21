const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectChatMessageSchema = new Schema({
    sent_at: Date,
    message: String,
    from_employee: {type: Schema.Types.ObjectId, ref: "Employee"},
    to_employee: {type: Schema.Types.ObjectId, ref: "Employee"}
})

module.exports = mongoose.model("DirectChatMessage", DirectChatMessageSchema);
