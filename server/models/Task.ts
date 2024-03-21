const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    complete: Boolean,
    urgent: Boolean,
    creator: {type: Schema.Types.ObjectId, ref: "Employee"},
})

module.exports = mongoose.model("Task", TaskSchema);
