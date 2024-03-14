const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeRequestSchema = new Schema({
})

module.exports = mongoose.model("ChangeRequest", ChangeRequestSchema);
