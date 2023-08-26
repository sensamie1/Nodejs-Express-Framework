const fs = require('fs');

const path = require('path');

const itemsDbPath = path.join(__dirname, 'items.json');

const preReaditems = fs.readFileSync(itemsDbPath)
const items = JSON.parse(preReaditems)

// SAVE TO DATABASE (fs.writeFile)
const saveToDb = (req, res) => {
  fs.writeFile(itemsDbPath, JSON.stringify(items), (err) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end(JSON.stringify({
        message: 'Internal Server Error.'
      }));
    }
    res.end(JSON.stringify(items));
  });
}

// READ DATABASE (fs.reaFile)
const readDb = (rea, res) => {
  fs.readFile(itemsDbPath, "utf8", (err, items)=> {
    if (err){
      console.log(err)
      res.writeHead(400)
      res.end("An error occured")
    }
    res.end(items);
})
}
//GET ALL 
const getItems = (req, res) => {
  const query = req.query

    let itemsArrayDuplicate = items;
    if (query.size) {
        itemsArrayDuplicate = itemsArrayDuplicate.filter(itm => itm.size.includes(query.size))
    }

    if (query.limit) {
        itemsArrayDuplicate = itemsArrayDuplicate.slice(0, req.limit - 1)
    }

    if (query.search) {
        itemsArrayDuplicate = itemsArrayDuplicate.filter(itm => itm.size.includes(query.search) || itm.name.includes(query.search) || itm.price.includes(query.search))
    }

  readDb(req, res)

  res.status(200).json({
    data: items,
    error: null
  })
}

//CREATE ITEM
const createItems = (req, res) => {

  const item = req.body;
  //// get ID of last item in the database
  // const lastItem = items[items.length - 1];
  // const lastItemId = lastItem.id;
  // newItem = lastItemId + 1;

  // get ID for a new item even when array(database) is empty.
  const newItem = items.length + 1;

  itemWithId = { ...item, id: newItem }
  
  
  items.push(itemWithId)

  saveToDb(req, res)

  return res.status(201).json({
      data: items,
      error: null
  })
}

//GET ONE
const getOneItem = (req,res)=>{
    const id = req.params.id 
    const foundItem = items.find((item)=>{
      return item.id == parseInt(id)
    })
    if(!foundItem){
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(foundItem)
}

//UPDATE ITEM
const updateItem = (req, res)=>{
    const id = req.params.id
    const update = req.body
    const foundIndex = items.findIndex(item=>item.id == parseInt(id))
    if(foundIndex== -1){
        res.end(`Item with id ${id} is not found`)
        return
    }
    items[foundIndex] = {...items[foundIndex], ...update}
    saveToDb(req, res)
    res.status(200).json(items[foundIndex])
}
// DELETE ITEM
const deleteItem = (req,res)=>{
    const id = req.params.id
    const foundIndex = items.findIndex(item=>item.id == parseInt(id))
    if(foundIndex== -1){
        res.end(`Item with id: ${id} is not found`)
        return
    }
    items.splice(foundIndex, 1)
    saveToDb(req, res)
    res.end(`Item with id: ${id}, deleted successfully`)
}


module.exports = {
    getItems,
    createItems,
    getOneItem,
    updateItem,
    deleteItem
}