const mongoose = require('mongoose');


const Add_new_task = mongoose.Schema({
    project: { type: String, required: true },
    todo: { type: String, required: true }
})

module.exports = mongoose.model("todo",Add_new_task)