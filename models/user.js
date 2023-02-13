//USER MODEL: What data a user in the website contains.
//Models configuration with Mongoose

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true, //can't be repeated
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String
});

//Exporting model:
module.exports = mongoose.model("User", UserSchema);