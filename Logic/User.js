const express = require('express');
const userrouter = express.Router();
const userSchema = require('../Schema/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userrouter.post('/new', (req, res) => {
    const data = req.body;
    bcrypt.hash(data.password, 10).then(hashedpass => {

        const user = new userSchema({
            userid: data.userid,
            password: hashedpass
        })

        user.save().then(data => {
            res.status(200).send({
                message: "user registered sucessfully",
                detail: data
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

    const data = req.body;

    userSchema.findOne({ userid: data.userid }).then(user => {
        if (user) {
           // console.log(user)
            bcrypt.compare( data.password,user.password).then(response => {
                console.log(response)
                if (response) {
                    const token = jwt.sign({
                        userid: user.userid,
                        id: user._id
                    },
                        process.env.SECRET_KEY, {
                        expiresIn: "24h"
                    })

                    res.status(200).json({
                        message: "Login credential matched!!",
                        Token: token,
                        name: user.userid.split("@")[0],
                        user: user.userid,
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

