const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    manager: {
        type: Schema.Types.ObjectId, 
        ref: "Employee"
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model("Team", TeamSchema);
