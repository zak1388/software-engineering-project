const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    }, 
    password: {
        type: String,
        require: true
    }
})

const UsersModel = mongoose.models.users || mongoose.model('users', UserSchema);

module.exports = UsersModel

