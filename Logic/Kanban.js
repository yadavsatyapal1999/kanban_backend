const express = require('express');
const kanban = require('../Schema/Kanban');
const projectrouter = express.Router();
const auth = require("../Authorization/Authorization")


projectrouter.get('/', (req, res) => {
    res.send("get task");
})

projectrouter.post('/new', auth, (req, res) => {
    console.log("newproject")
    const project = req.body;
    const id = req.owner;
    const data = new kanban({
        owner: id,
        Kanban: project.kanban
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