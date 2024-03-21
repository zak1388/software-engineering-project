const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeResponseSchema = new Schema({
    approved: Boolean,
    reason: String,
    ManagerId: {type: Schema.Types.ObjectId, ref: "Employee"},
    ChangeRequestId: {type: Schema.Types.ObjectId, ref: "ChangeRequest"}
})

module.exports = mongoose.model("ChangeResponse", ChangeResponseSchema);
