const express = require('express');
const taskrouter = express.Router();
const task = require('../Schema/Task')
const auth = require("../Authorization/Authorization")


taskrouter.get('/',auth, (req, res) => {
   const user = req.owner ;
    task.find({owner:user}).then(rec => {
        res.send(rec)
    })
    .catch(err=>{
        res.send("No task found for user")
    })
})

taskrouter.post('/new', auth, (req, res) => {
    console.log("Task")
    
    const id = req.owner;
    const other = req.body;
    //console.log(`id  ${id}`)

    const newtodo = new task({
        owner: id,
        Kanban: other.kanban,
        task: other.task
    })
    newtodo.save().then(rec => {
        res.status(200).send("Data Saved Sucessfully")

    })
        .catch(err => {
            res.status(500).send("unknown error occurred")
            console.log(err)
        })

})


module.exports = taskrouter;