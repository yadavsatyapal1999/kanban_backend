const express = require('express');
const taskschema = require('../Schema/Addnewproject');
const projectrouter = express.Router();


projectrouter.get('/', (req, res) => {
    res.send("get task")
})

projectrouter.post('/new', (req, res) => {
    console.log("newproject")
    const project = req.body;

    const data = new taskschema({
        projectname: project.projectname
    })
    data.save().then(rec => {
        console.log("New Project Saved");
        res.status(200).send('data saved sucessfully')
    })
        .catch(err => {
            res.status(500).send("error in savind data");
            console.log(err)
        })

})

module.exports = projectrouter ;