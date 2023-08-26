const express = require('express');

const controller = require('./items-controller')
const middleware = require('./items-middleware')
const globalMiddleware = require('../middlewares/global-middleware')

const itemsRouter = express.Router();

// itemsRouter.use(express.json())

itemsRouter.use(globalMiddleware.apiKeyAuth)

// GET ITEMS
itemsRouter.get('/', controller.getItems)

// POST ITEMS
itemsRouter.post('/', globalMiddleware.checkBody, globalMiddleware.checkAdmin, middleware.checkSize, controller.createItems)


// GET ONE ITEM
itemsRouter.get('/:id', controller.getOneItem)

// UPDATE ON ITEM
itemsRouter.patch("/:id", globalMiddleware.checkBody, globalMiddleware.checkAdmin, controller.updateItem)
    
// Delete one /students/134
itemsRouter.delete("/:id", globalMiddleware.checkBody, globalMiddleware.checkAdmin, controller.deleteItem )

module.exports = itemsRouter