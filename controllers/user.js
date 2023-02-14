const bcrypt = require("bcryptjs")
const User = require("../models/user");
const image = require("../utils/image");

//Endpoint to receive the user data that you are logged in:
async function getMe(req, res) {
    const { user_id } = req.user;

    const response = await User.findById(user_id);

    if (!response) {
        res.status(400).send({ msg: "No user found" });
    } else {
        res.status(200).send(response);
    }
};


//Endpoints to receive all users:
async function getUsers(req, res) {
    const { active } = req.query; //Receiving only active users.
    let response = null

    if (active === undefined) {
        response = await User.find();
    } else {
        response = await User.find({ active });
    }

    res.status(200).send(response);
};


//Endpoint to create users from the admin role:
async function createUser(req, res) {
    const { password } = req.body;
    const user = new User({ ...req.body, active: false })

    const salt = bcrypt.genSaltSync(10); //crypting password
    const hasPassword = bcrypt.hashSync(password, salt);
    user.password = hasPassword

    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar)
        user.avatar = imagePath
    }

    user.save((error, userStored) => {
        if (error) {
            res.status(400).send({ msg: "Error when creating user" })
        } else {
            res.status(201).send(userStored)
        }
    });
}

//Endpoint to update user
async function updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;

    // Password Crypting update
    if (userData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword
    } else {
        delete userData.password;
    }

    // Avatar Update
    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath
    }

    //Finding user to update
    User.findByIdAndUpdate({ _id: id }, userData, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error when updating user" })
        } else {
            res.status(200).send({ msg: "Updating user successful" })
        }
    })
}

//Endpoint to delete user
async function deleteUser(req, res) {
    const { id } = req.params;

    User.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error when deleting user" })
        } else {
            res.status(200).send({ msg: "User eliminated" })
        }
    })
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}