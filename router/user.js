const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticate");

const api = express.Router();

api.get("/user/me", [md_auth.assureAuth], UserController.getMe);

module.exports = api;

//Middlewares: Functions that get executed in the middle of the petition.
// Protected endpoints: The middleware will check if the user is authorized to do an action.