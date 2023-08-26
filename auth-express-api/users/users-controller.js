const fs = require('fs');

const path = require('path');

const usersDbPath = path.join(__dirname, 'users.json');

const preReadusers = fs.readFileSync(usersDbPath)
const users = JSON.parse(preReadusers)

// SAVE TO DATABASE (fs.writeFile)
const saveToDb = (req, res) => {
    fs.writeFile(usersDbPath, JSON.stringify(users), (err) => {
        if (err) {
            console.log(err);
            res.writeHead(500);
            res.end(JSON.stringify({
                message: 'Internal Server Error.'
            }));
        }
        res.end(JSON.stringify(users));
    });
}

const CreateUser = (req, res) => {
    const user = req.body;

    user.api_key = `${user.username}_${user.password}`

    if (user.username === 'samie') {
        user.user_type = 'admin'
    } else {
        user.user_type = 'user'
    }

    users.push(user)

    saveToDb(req, res)

    return res.status(201).json({
        message: 'User created successfully',
        users: users
    })

}

module.exports = {
    CreateUser
}