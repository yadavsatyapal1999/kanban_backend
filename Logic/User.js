const express = require('express');
const userrouter = express.Router();
const userSchema = require('../Schema/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Kanban = require('../Schema/Kanban')

userrouter.post('/new', async (req, res) => {
    console.log("new user");
    const data = req.body;
    let userexist = await userSchema.findOne({ email: data.email })
    if (userexist) {
        res.status(400).send("user already exist")
    }

    else {
        //console.log(data)
        bcrypt.hash(data.password, 10).then(hashedpass => {

            const user = new userSchema({
                email: data.email,
                password: hashedpass
            })



            user.save().then(data => {
                console.log(data)

                res.status(200)
            })

                .catch(err => {
                    console.log(err)
                    res.status(500).send("Internal server error")
                })



        })


    }
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
            res.status(500).json({
                message: "Email is not registered with us.."
            })
        }
    })
        .catch(err => {
            res.status(600).json({
                message: "Internal server Error!!"
            })

        })
})

module.exports = userrouter

