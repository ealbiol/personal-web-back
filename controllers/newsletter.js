// NEWSLETTER CONTROLLER

const Newsletter = require("../models/newsletter");

// ENDPOINTS

//Endpoint create/POST newsletter
async function subscribeEmail(req, res) {
    const { email } = req.body;

    if(!email) res.status(400).send({msg: "Email not provided"});

    const newsletter = new Newsletter({
        email: email.toLowerCase(),
    });

    newsletter.save((error) => {
        if (error) {
            res.status(400).send({ msg: "Email already registered" })
        } else {
            res.status(200).send({ msg: "Email registered" })
        }
    })
}


//Endpoints to receive/GET all subscribed emails:
function getEmails(req, res) {
    const { page = 1, limit = 10 } = req.query; //Values by default if any given by user.
    const options = {
        page: parseInt(page),
        limit: parseInt(limit), //limit of elements per page
    };

    Newsletter.paginate({}, options, (error, emailsStored) => {
        if (error) {
            res.status(400).send({ msg: "Error when getting emails" })
        } else {
            res.status(200).send(emailsStored)
        }
    })

};


//Endpoint to delete/DELETE email
async function deleteEmail(req, res) {
    const { id } = req.params;

    Newsletter.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error when deleting email" })
        } else {
            res.status(200).send({ msg: "email eliminated" })
        }
    });
}


module.exports = {
    subscribeEmail,
    getEmails,
    deleteEmail
};