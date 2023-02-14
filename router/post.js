// POST ROUTING

const express = require("express");
const multiparty = require("connect-multiparty"); //Middleware to accept multiparty petition instead of JSON. In this case it's used to accept images.
const PostController = require("../controllers/post");
const md_auth = require("../middlewares/authenticate"); // Only authenticated user can manipulate courses

const md_upload = multiparty({ uploadDir: "./uploads/blog" }); //Folder where miniatures images will be placed.

const api = express.Router();

// ENDPOINTS

// Endpoint Post create/POST post
api.post("/post", [md_auth.assureAuth, md_upload], PostController.createPost);
// Endpoint to Get/GET all posts:
api.get("/post", PostController.getPosts); //No middleware needed since it must be accessible for everyone.
// Endpoint to update/PTCH a post
api.patch(
    "/post/:id",
    [md_auth.assureAuth, md_upload],
    PostController.updatePost
);
// Endpoint to Delete/DELETE post:
api.delete("/post/:id", [md_auth.assureAuth], PostController.deletePost);
// get post by path/route
api.get("/post/:path", PostController.getPost)

module.exports = api;