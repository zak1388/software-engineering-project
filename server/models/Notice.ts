const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    type: String,
    title: String,
    main_text: String,
    date: Date,
    creator: {type: Schema.Types.ObjectId, ref: "Employee"},
    team: {type: Schema.Types.ObjectId, ref: "Team"},
})

module.exports = mongoose.model("Notice", NoticeSchema);
