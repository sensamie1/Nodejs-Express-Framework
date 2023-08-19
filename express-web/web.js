const express = require('express');
const path = require('path');
const fs = require('fs').promises

const port = 4002;

const web = express();

web.use(express.static('public'));

const homePagePath = path.join(__dirname, 'public', 'index.html')
const notFoundPagePath = path.join(__dirname, 'public', '404.html')

const handleHomePage = async (req, res) => {
  try {
    const file = await fs.readFile(homePagePath, 'utf-8')
    res.status(200).send(file)
  } catch (error) {
    console.log(error)
  }
}

const handleNotFoundPage = async (req, res) => {
  try {
    const file = await fs.readFile(notFoundPagePath, 'utf-8')
    res.send(file)
  } catch(error) {
    console.log(error)
  }
}

web.get('/index.html', handleHomePage)

web.get('*', handleNotFoundPage)


web.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})