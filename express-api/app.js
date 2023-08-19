const express = require('express');
const itemsRouter = require('./items/itemsrouter');

const port = 4002;

const app = express()

app.use(express.json()) // body parser

app.use('/items', itemsRouter)



app.listen(port, () => console.log(`listening on port: ${port}`))