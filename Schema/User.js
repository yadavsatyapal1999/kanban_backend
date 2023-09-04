const mongoose = require('mongoose');


const newuser = mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})


module.exports = mongoose.model("User",newuser)