const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
    login: (req, res) => {
        res.render('./users/login')

    },
    registro: (req, res) => {
        res.render('./users/register')

    },
    newUser: (req, res) => {
        if (req.body.password == req.body.repassword) {
            let newUser = {
                id: users[users.length - 1].id + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file.filename,
            };
            users.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users));
            res.redirect('/');
        } else {
            res.redirect('/register');
        }

    }

}

module.exports = usersController;