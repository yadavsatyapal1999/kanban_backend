const express = require('express');
const userrouter = express.Router();
const userSchema = require('../Schema/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Kanban = require('../Schema/Kanban')

userrouter.post('/new', async (req, res) => {
    const data = req.body;
    bcrypt.hash(data.password, 10).then(hashedpass => {

        const user = new userSchema({
            email: data.email,
            password: hashedpass
        })



        user.save().then(data => {

            const done = new Kanban({
                owner: data._id,
                Kanban: "Done"
            })
            const todo = new Kanban({
                owner: data._id,
                Kanban: "Todo"
            })

            const doing = new Kanban({
                owner: data._id,
                Kanban: "Doing"
            })

            done.save().then(() => {
                todo.save().then(() => {
                    doing.save().then(() => {
                        res.status(200).send({
                            message: "user registered sucessfully",
                            detail: data
                        })
                    }).catch(err => {
                        res.status(400).send("failed to add kanban for Doing")
                    })
                })
                    .catch(err => {
                        res.status(400).send("failed to add kanban for TODO")
                    })
            })
                .catch(err => {
                    res.status(400).send("failed to add kanban for Done")
                })


        })
            .catch(err => {
                res.status(400).send("user already exist");
                console.log(err)
            })

    })
        .catch(err => {
            res.status(500).send("Internal server error")
        })




})

userrouter.post('/login', (req, res) => {
    console.log("login")
    const data = req.body;

    userSchema.findOne({ email: data.email }).then(user => {
        if (user) {
            // console.log(user)
            bcrypt.compare(data.password, user.password).then(response => {
                console.log(user)
                if (response) {
                    const token = jwt.sign({
                        email: user.email,
                        id: user._id
                    },
                        process.env.SECRET_KEY, {
                        expiresIn: "24h"
                    })

                    res.status(200).json({
                        message: "Login credential matched!!",
                        Token: token,
                        name: user.email.split("@")[0],
                        user: user._id,
                    })
                } else {
                    res.status(400).json({
                        message: "Email or password does not match!!"
                    })
                }
            })
        } else {
            res.status(400).json({
                message: "Email is not registered with us.."
            })
        }
    })
        .catch(err => {
            res.status(500).json({
                message: "Internal server Error!!"
            })

        })
})

module.exports = userrouter

