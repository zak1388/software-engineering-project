const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManagerNoticeSchema = new Schema({
    title: String,
    notice: String,
    urgent: Boolean,
    date: Date,
    creator: {type: Schema.Types.ObjectId, ref: "Employee"},
    team: {type: Schema.Types.ObjectId, ref: "Team"},
})

module.exports = mongoose.model("ManagerNotice", ManagerNoticeSchema);
