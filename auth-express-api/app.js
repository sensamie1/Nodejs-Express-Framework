const express = require('express');
const itemsRouter = require('./items/items-router');
const usersRouter = require('./users/users-router');

const port = 4002;

const app = express()

app.use(express.json()) // body parser

app.use('/users', usersRouter)

app.use('/items', itemsRouter)




app.listen(port, () => console.log(`listening on port: ${port}`))