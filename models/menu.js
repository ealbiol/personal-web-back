// WEBSITE DYNAMIC MENU SCHEMA MODEL

const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
    title: String,
    path: String, // URL of menu section
    order: Number, // Moving menu section
    active: Boolean, // Activate or deactivate menu section
});

module.exports = mongoose.model("Menu", MenuSchema);