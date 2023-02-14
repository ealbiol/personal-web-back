// POST CONTROLLER

const Post = require("../models/post"); //Importing Mongoose Post Shcema.
const image = require("../utils/image");

// ENDPOINTS

//Endpoint create/POST post
async function createPost(req, res) {
    const post = new Post(req.body) // In req.body we receive the data of the user's new post

    post.created_at = new Date(); // Time the post is created.

    const imagePath = image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    post.save((error, postStored) => { // postStored is the new created post by the user
        if (error) {
            res.status(400).send({ msg: "Error when creating post" })
        } else {
            res.status(201).send(postStored) // We send the data of the post created by the user
        }
    });
}


//Endpoints to receive/GET all posts:
function getPosts(req, res) {
    const { page = 1, limit = 10 } = req.query; //Values by default if any given by user.
    const options = {
        page: parseInt(page),
        limit: parseInt(limit), //limit of elements per page
        sort: { created_at: "desc" }
    };

    Post.paginate({}, options, (error, postsStored) => {
        if (error) {
            res.status(400).send({ msg: "Error when getting posts" })
        } else {
            res.status(200).send(postsStored)
        }
    })

};


//Endpoint to update/PTCH post
async function updatePost(req, res) {
    const { id } = req.params; // Params defined in the route. In this case the id.
    const postData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    //Finding post to update
    Post.findByIdAndUpdate({ _id: id }, postData, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error when updating post" })
        } else {
            res.status(200).send({ msg: "Updating post successful" })
        }
    })
}


//Endpoint to delete/DELETE post
async function deletePost(req, res) {
    const { id } = req.params;

    Post.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error when deleting post" })
        } else {
            res.status(200).send({ msg: "post eliminated" })
        }
    });
}


//Endpoint to GET a single post
function getPost(req, res) {
    const { path } = req.params; //We get the path/route of the post

    Post.findOne({ path }, (error, postStored) => {
        if (error) {
            res.status(500).send({ msg: "Server Error" });
        } else if (!postStored) {
            res.status(400).send({ msg: "No post found" });
        } else {
          res.status(200).send(postStored)  
        }
    })
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
};