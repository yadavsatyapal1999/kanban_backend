const mongoose = require('mongoose');
const user = require('./User')

const Add_new_task = mongoose.Schema({
    owner:{type:mongoose.Schema.ObjectId , ref:user},
    Kanban: { type: String, required: true },
    task: { type: String, required: true }
})

module.exports = mongoose.model("Task",Add_new_task)