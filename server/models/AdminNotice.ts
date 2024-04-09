const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminNoticeSchema = new Schema({
    title: String,
    notice: String,
    urgent: Boolean,
    creator: {type: Schema.Types.ObjectId, ref: "Employee"},
})

module.exports = mongoose.model("AdminNotice", AdminNoticeSchema);
