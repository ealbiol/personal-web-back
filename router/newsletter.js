// NEWSLETTER ROUTING

const express = require("express");
const NewsletterController = require("../controllers/newsletter");
const md_auth = require("../middlewares/authenticate");

const api = express.Router();

//ENDPOINTS
api.post("/newsletter", NewsletterController.subscribeEmail);
// Endpoint to Get/GET all emails:
api.get("/newsletter", [md_auth.assureAuth], NewsletterController.getEmails); 
// Endpoint to Delete/DELETE email:
api.delete("/newsletter/:id", [md_auth.assureAuth], NewsletterController.deleteEmail);

module.exports = api;