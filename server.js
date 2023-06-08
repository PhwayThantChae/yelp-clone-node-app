"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const User = require("./api/models/userModel");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const routes = require("./api/routes/userRoutes");

const mongoose = require("mongoose");
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect("mongodb://127.0.0.1:27017/yelp-mongo-test", option).then(
  function () {
    //connected successfully
    console.log("mongo connected");
  },
  function (err) {
    //err handle
    console.log(err);
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("Server started on: " + port);

module.exports = app;
