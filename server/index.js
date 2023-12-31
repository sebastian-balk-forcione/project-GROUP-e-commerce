'use strict';

const express = require('express');
const morgan = require('morgan');

require("dotenv").config();

//TODO:: Delete the batch import refrence and the function invocation below.
const { batchImport } = require("./data/batchImport");
//batchImport();

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .use(require("./routes"))

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
