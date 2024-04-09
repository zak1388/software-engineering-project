const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeRequestSchema = new Schema({
    type: String,
    proof: String,
    employee_id: {type: Schema.Types.ObjectId, ref: "Employee"},
    state: String,
    from: String,
    to: String,
    date: Date,
})

module.exports = mongoose.model("ChangeRequest", ChangeRequestSchema);
