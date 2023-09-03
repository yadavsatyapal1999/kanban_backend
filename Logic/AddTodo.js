const express = require('express');
const taskrouter = express.Router();
const addtodo = require('../Schema/Addtodo')


taskrouter.get('/',(req,res)=>{
    res.send("get")
})

taskrouter.post('/newtodo/:projectname', (req, res) => {
    console.log("newtodo")
    const projectname = req.params.projectname;
    const other = req.body;

    const newtodo = new addtodo({
        project: projectname,
        todo: other
    })
    newtodo.save().then(rec => {
        res.status(200);
        console.log(rec)
    })
        .catch(err => {
            res.status(500);
            console.log(err)
        })

})


module.exports = taskrouter;