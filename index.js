//____CONNECTION TO DATABASE WITH MONGOOSE_____

//Mongoose: library that creates a connection between MongoDB and the Node.js 

//Importing mongoose:
const mongoose = require("mongoose");
//Once connected to database we raise the HTTP server:
const app = require("./app")
// Importing constants from constants.js:
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    IP_SERVER,
    API_VERSION,
} = require("./constants");

//Definning port where HTTP server will be raised:
const PORT = process.env.POST || 3977;

//Connection do database and raising port:
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`, //string taken from MongoDB Connect button
    (error) => {
        if (error) throw error;

        app.listen(PORT, () => {
            console.log("#####################");
            console.log("#🤺API REST RAISED!🤺#");
            console.log("#####################");
            console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
        })
    })

    // Nodemon installed to get automated refresh of the server when any change applied.