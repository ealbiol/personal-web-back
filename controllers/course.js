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


//Endpoints to receive/GET all courses:
function getCourses(req, res) {
const{page = 1, limit = 10} = req.query; //Values by default if any given by user.
    const options = {
        page: parseInt(page),
        limit: parseInt(limit) //limit of elements per page
    };

    Course.paginate({}, options, (error, courses) => {
        if (error) {
            res.status(400).send({ msg: "Error when getting courses" })
        } else {
            res.status(200).send(courses)
        }
    })

};

module.exports = {
    createCourse,
    getCourses,
};

