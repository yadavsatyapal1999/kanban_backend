const express = require('express');
const taskrouter = express.Router();
const addtodo = require('../Schema/Addtodo')
const auth = require("../Authorization/Authorization")


taskrouter.get('/', (req, res) => {
    res.send("get")
})

taskrouter.post('/new/:projectname', auth, (req, res) => {
    console.log("newtodo")
    const projectname = req.params.projectname;
    const other = req.body;

    const newtodo = new addtodo({
        project: projectname,
        todo: other.todo
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