//____EXPRESS CONFGIRUATION____

//Express: framework for building RESTful APIs with Node.js

//Importing fameworks: express, bodyParser and CORS:
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
//and constants from constants.js
const { API_VERSION } = require("./constants");

//Initiating Express:
const app = express();

// Import routings
const authRoutes = require("./router/auth")

//Configure Body Parser: to parse client data arriving to the server:
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure statics folder: Where images uploaded to the server will be saved.
app.use(express.static("uploads"));

// Configure Header HTTP - CORS: So that when doing client HTTP petitions the server won't block them
app.use(cors());

// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;