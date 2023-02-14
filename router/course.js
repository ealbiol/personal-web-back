// COURSE ROUTING

const express = require("express");
const CourseController = require("../controllers/course");
const multiparty = require("connect-multiparty"); //Middleware to accept multiparty petition instead of JSON. In this case it's used to accept images.
const md_auth = require("../middlewares/authenticate");
const md_upload = multiparty({ uploadDir: "./uploads/course" })

const api = express.Router();

//ENDPOINTS

// Create new user:
api.post("/course", [md_auth.assureAuth, md_upload], CourseController.createCourse);

module.exports = api;