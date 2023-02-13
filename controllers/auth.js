const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

//Function of Registration Authorization:
function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!email) res.status(400).send({ msg: "Email is mandatory" });
    if (!password) res.status(400).send({ msg: "Password is mandatory" });

    //New user details configuration
    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
    });

    //User Password Crypting Process:
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt)
    user.password = hashPassword;

    //Saving user to database:
    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({ msg: "Error when creating user" });
        } else {
            res.status(200).send(userStorage);
        }
    })
}


//Login configuration:
function login(req, res) {
    const { email, password } = req.body;

    if (!email) res.status(400).send({ msg: "Email is mandatory" });
    if (!password) res.status(400).send({ msg: "Password is mandatory" });

    const emailLowerCase = email.toLowerCase();

    // We search whether email already exists in databse:
    User.findOne({ email: emailLowerCase }, (error, userStore) => {
        if (error) {
            res.status(500).send({ msg: "Server error" })
        } else {
            //Comparing that crypted and non-crypted password are the same
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if (bcryptError) {
                    res.status(500).send({ msg: "Server Error" })
                } else if (!check) {
                    res.status(400).send({ msg: "Wrong Password" });
                } else if (!userStore.active) {
                    res.status(401).send({ msg: "Unauthorized or non active user" })
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore), //Receiving access token
                        refresh: jwt.createRefreshToken(userStore), //Receiving refresh token
                    })
                }
            })
        }
    })
};

//Function to refresh access token when it expired:
function refreshAccessToken(req, res) {
    const { token } = req.body; //Getting the user access token.

    if (!token) res.status(400).send({ msg: "Token required" });

    const { user_id } = jwt.decoded(token); //Getting the user id.

    //Search in database if user id exists;
    User.findOne({ _id: user_id }, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: "Server Error" });
        } else {
            res.status(200).send({
                //if user exists a new access token is created
                accessToken: jwt.createAccessToken(userStorage),
            })
        }
    })
}
module.exports = {
    register,
    login,
    refreshAccessToken,
};