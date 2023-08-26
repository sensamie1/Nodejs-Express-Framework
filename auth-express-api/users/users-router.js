const express = require('express');
const middleware = require('./users-middleware')
const controller = require('./users-controller')
const globalMiddleware = require('../middlewares/global-middleware')

const router = express.Router();

router.use(express.json()) // body parser


// CREATE USER
router.post('/', globalMiddleware.checkBody, middleware.ValidateUserCreation, controller.CreateUser)


module.exports = router