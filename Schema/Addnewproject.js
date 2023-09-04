const mongoose = require('mongoose');


const Add_new_project = mongoose.Schema({

    projectname: { type: String, required: true, unique: true }
})

const projectmodel = mongoose.model('Projects', Add_new_project);

module.exports = projectmodel;