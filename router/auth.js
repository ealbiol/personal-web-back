const express = require("express");
const AuthController = require("../controllers/auth");

//Creating Router
const api = express.Router();

//ENDPOINTS

//Endpoint 1: Client post to server.
//When a post to this route is made the function AuthController (from the controllers foleder) is executed.
api.post("/auth/register", AuthController.register);

//Endpoint 2
api.post("/auth/login", AuthController.login);

//Endpoint 3
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken)
module.exports = api;