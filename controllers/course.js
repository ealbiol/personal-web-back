// COURSE CONTROLLER

const Course = require("../models/course");
const image = require("../utils/image")
// ENDPOINTS

//Endpoint create course
async function createCourse(req, res) {
    const course = new Course(req.body) // In req.body we receive the data of the user's new course

    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;

    course.save((error, courseStored) => { // courseStored is the new created course by the user
        if (error) {
            res.status(400).send({ msg: "Error when creating course" })
        } else {
            res.status(200).send(courseStored) // We send the data of the course created by the user
        }
    });
}

module.exports = {
    createCourse,
};

