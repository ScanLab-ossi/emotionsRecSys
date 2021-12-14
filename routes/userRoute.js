// this module will send and get data to and from the database

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.route("/create").post((req,res)=>{
    const page = req.body.page;
    const user = req.body.user;
    const movie = req.body.movie;
    const action = req.body.action;
    const value = req.body.value;

    const newAction = new User({
        page,
        user,
        movie,
        action,
        value
    });

    newAction.save().then(() => console.log(res + "added!"))
    .catch(err => res.status(400).json("Error adding Action: " + err));
})

module.exports = router;
