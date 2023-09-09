const express = require('express');
const kanban = require('../Schema/Kanban');
const projectrouter = express.Router();
const auth = require("../Authorization/Authorization")


projectrouter.get('/get/:owner', (req, res) => {
    console.log("get kanban")
    const owner = req.params.owner ;
    console.log(owner)
    kanban.find({owner:owner}).then(data=>{
        res.status(200).send(data)
        console.log("kanban of owner send");
    })
    .catch(err=>{
      console.log(err);
      res.status(400)
    })
})

projectrouter.post('/new', auth, (req, res) => {
    console.log("New Kanabn")
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