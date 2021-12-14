const mongoose = require("mongoose");

const userSchema = {
    page: String,
    user: String,
    movie: String,
    action: String,
    value: String
}

const User = mongoose.model("User", userSchema);

module.exports = User;