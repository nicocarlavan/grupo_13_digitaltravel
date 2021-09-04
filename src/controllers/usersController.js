const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
    login: (req, res) => {
        res.render('./users/login')

    },
    registro: (req, res) => {
        res.render('./users/register');

    },
    newUser: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
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

    }

}

module.exports = usersController;