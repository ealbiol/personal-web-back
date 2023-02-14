const express = require("express");
const multiparty = require("connect-multiparty"); //Middleware to accept multiparty petition instead of JSON. In this case it's used to accept images.
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticate");

const md_upload = multiparty({ uploadDir: "./uploads/avatar" })
const api = express.Router();

// Get logged in user:
api.get("/user/me", [md_auth.assureAuth], UserController.getMe);
// Get all users:
api.get("/users", [md_auth.assureAuth], UserController.getUsers);
// Create new user:
api.post("/user", [md_auth.assureAuth, md_upload], UserController.createUser);
// Update user:
api.patch(
    "/user/:id",
    [md_auth.assureAuth, md_upload],
    UserController.updateUser
);
// Delete user:
api.delete("/user/:id", [md_auth.assureAuth], UserController.deleteUser);


module.exports = api;

//Middlewares: Functions that get executed in the middle of the petition.
// Protected endpoints: The middleware will check if the user is authorized to do an action.