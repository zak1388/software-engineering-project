const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeResponseSchema = new Schema({
})

module.exports = mongoose.model("ChangeResponse", ChangeResponseSchema);
