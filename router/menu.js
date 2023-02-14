// MENU ROUTING

const express = require("express");
const MenuController = require("../controllers/menu");
const md_auth = require("../middlewares/authenticate"); // Only authenticated user can manipulate courses

const api = express.Router();

// ENDPOINTS

// Endpoint Post user create menu
api.post("/menu", [md_auth.assureAuth], MenuController.createMenu);
// Endpoint to Get all menus
api.get("/menu", MenuController.getMenus); //No middleware needed since it must be accessible for everyone.
// Endpoint to update a menu
api.patch(
    "/menu/:id",
    [md_auth.assureAuth],
    MenuController.updateMenu
);
// Delete menu:
api.delete("/menu/:id", [md_auth.assureAuth], MenuController.deleteMenu);


module.exports = api;