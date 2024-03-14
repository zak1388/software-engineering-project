const mongoose = require("mongoose");
const Schema = mongoose.Schema;

enum ChangeRequestType {
    Name,
    Address,
    Gender
};

const ChangeRequestSchema = new Schema({
    type: ChangeRequestType,
    proof: String,
    details: String,
    employee_id: {type: Schema.Types.ObjectId, ref: "Employee"},
})

module.exports = mongoose.model("ChangeRequest", ChangeRequestSchema);
