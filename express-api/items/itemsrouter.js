const express = require('express');

const controller = require('./itemscontroller')
const middleware = require('./itemsmiddleware')

const itemsRouter = express.Router();

// itemsRouter.use(express.json())

// GET ITEMS
itemsRouter.get('/', controller.getItems)

// POST ITEMS
itemsRouter.post('/', middleware.checkSize, controller.createItems)

// GET ONE ITEM
itemsRouter.get('/:id', controller.getOneItem)

// UPDATE ON ITEM
itemsRouter.patch("/:id", controller.updateItem)
    
// Delete one /students/134
itemsRouter.delete("/:id", controller.deleteItem )

module.exports = itemsRouter