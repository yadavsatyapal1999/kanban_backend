const express = require('express');
const taskschema = require('../Schema/Addnewproject');
const projectrouter = express.Router();
const auth = require("../Authorization/Authorization")


projectrouter.get('/', (req, res) => {
    res.send("get task")
})

projectrouter.post('/new', auth, (req, res) => {
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
            res.status(500)
                //console.log(err)
                .send(err)
        })

})

module.exports = projectrouter;