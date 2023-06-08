"use strict";

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let User = mongoose.model("User");

exports.register = async (req, res) => {
  let newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  try {
    const user = await newUser.save();
    user.hash_password = undefined;
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};

exports.sign_in = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log("**********************");
      console.log("**********************");
      console.log("**********************");
      console.log("**********************");
      console.log("**********************");
      console.log("**********************");
  
      if (!user || !bcrypt.compare(req.body.password, user.hash_password)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password.",
        });
      }
  
      return res.json({
        token: jwt.sign(
          { email: user.email, fullName: user.fullName, _id: user._id },
          "RESTFULAPIs"
        ),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error occurred while authenticating the user.",
      });
    }
  };
  

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

exports.profile = (req, res, next) => {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
