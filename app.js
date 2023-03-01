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

// Import routings: Auth, User, Menu, Course
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post")
const newsletterRoutes = require("./router/newsletter")

//Configure Body Parser: to parse client data arriving to the server:
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure statics folder: Where images uploaded to the server will be saved.
app.use(express.static("uploads"));

// Configure Header HTTP - CORS: So that when doing client HTTP petitions the server won't block them
app.use(cors());

// Configure routings auth, user, menu, course.
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, menuRoutes)
app.use(`/api/${API_VERSION}`, courseRoutes)
app.use(`/api/${API_VERSION}`, postRoutes)
app.use(`/api/${API_VERSION}`, newsletterRoutes)


module.exports = app;

