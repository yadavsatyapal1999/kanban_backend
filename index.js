const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const newtodo = require('./Logic/AddTodo')
const newproject = require('./Logic/Addnewproject')
require('dotenv').config();



app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB)
    .then(res => {
        console.log("connected to db");
        //console.log(res)
        app.listen(process.env.PORT, () => {
            console.log(`Listening at port ${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.log(err);
    })

app.use('/addtodo', newtodo);
app.use('/project', newproject)


