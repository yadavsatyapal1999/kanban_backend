const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors =  require('cors')
const task= require('./Logic/Task')
const Kanban = require('./Logic/Kanban')
const user = require('./Logic/User')
require('dotenv').config();


app.use(cors({}))
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

app.use('/task', task);
app.use('/kanban', Kanban)
app.use('/user',user)


