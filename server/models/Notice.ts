const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    title: String,
    main_text: String,
    urgent: Boolean,
    creator: {type: Schema.Types.ObjectId, ref: "Employee"},
    team: {type: Schema.Types.ObjectId, ref: "Team"},
})

module.exports = mongoose.model("Notice", NoticeSchema);
