const mongoose = require('mongoose');
const user = require('../Schema/User')

const Add_new_project = mongoose.Schema({
    owner: { type: mongoose.Schema.ObjectId, ref: user },
    Kanban: { type: String, required: true, unique: true }

})

const projectmodel = mongoose.model('Kanban', Add_new_project);

module.exports = projectmodel;