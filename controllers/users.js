//Dependencies
const bcrypt = require("bcrypt");
const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.js")

//New (registration page)

//Create (registration route)


//Export User Router
module.exports = userRouter;

userRouter.post("/", (req, res)=>{
// overwrite the user password with the hashed password,
req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
res.send(req.body)
})