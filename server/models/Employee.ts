const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
})

module.exports = mongoose.model("Employee", EmployeeSchema);
