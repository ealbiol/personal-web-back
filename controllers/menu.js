// MENU CONTROLLER

const Menu = require("../models/menu"); //Importing Mongoose Menu Shcema.

//Endpoint create/POST menu
async function createMenu(req, res) {
    const menu = new Menu(req.body) // In req.body we receive the data of the user's new menu

    menu.save((error, menuStored) => { // menuStored is the new created menu by the user
        if (error) {
            res.status(400).send({ msg: "Error when creating menu" })
        } else {
            res.status(200).send(menuStored) // We send the data of the menu created by the user
        }
    });
}


//Endpoints to receive/GET all menus:
async function getMenus(req, res) {
    const { active } = req.query; //Receiving only active menus.
    let response = null

    if (active === undefined) {
        response = await Menu.find().sort({order: "asc"}); //sort to order them by order property.
    } else {
        response = await Menu.find({ active }).sort({order: "asc"});
    }

    if (!response) {
        res.status(400).send({ msg: "No menus found" })
    } else {
        res.status(200).send(response);
    }
};


//Endpoint to update/PTCH menu
async function updateMenu(req, res) {
    const { id } = req.params; // Params defined in the route. In this case the id. The id of the menu we want to update.
    const menuData = req.body;

    //Finding menu to update
    Menu.findByIdAndUpdate({ _id: id }, menuData, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error when updating menu" })
        } else {
            res.status(200).send({ msg: "Updating menu successful" })
        }
    })
}


//Endpoint to delete/DELETE menu
async function deleteMenu(req, res) {
    const { id } = req.params;

    Menu.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error when deleting menu" })
        } else {
            res.status(200).send({ msg: "menu eliminated" })
        }
    });
}

module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu,
};




// Menu (endpoint) Structure:
// 1. Model 2.Controller 3.Router, 4.App