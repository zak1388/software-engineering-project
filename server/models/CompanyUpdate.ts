const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyUpdateSchema = new Schema({
    title: String,
    mainText: String,
    urgent: Boolean
})

module.exports = mongoose.model("CompanyUpdate", CompanyUpdateSchema);
