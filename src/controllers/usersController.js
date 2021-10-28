const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
//const usersFilePath = path.join(__dirname, '../data/users.json');
//let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const db = require('../database/models');


const usersController = {
    login: (req, res) => {
        req.cookies
        res.render('./users/login')

    },
    loginProcess: (req, res) => {
        //let userToLoggin = User.findByField('email', req.body.email);
        db.User.findAll()
            .then(allUsers => {
                let userToLoggin = allUsers.find(oneUser => oneUser['email'] === req.body.email)
                if (userToLoggin) {
                    let hash = bcrypt.compareSync(req.body.password, userToLoggin.password);
                    if (hash) {
                        delete userToLoggin.password;
                        req.session.userLogged = userToLoggin;
                        if (req.body.rememberme) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
                        };
                        return res.redirect('/profile');
                    }
                    return res.render('./users/login', {
                        errors: {
                            email: {
                                msg: 'Las credenciales ingresadas son inválidas'
                            }
                        }
                    })
                }
                return res.render('./users/login', {
                    errors: {
                        email: {
                            msg: 'Este E-mail no se encuentra registrado'
                        }
                    }
                })
            });
    },
    profile: (req, res) => {
        res.render('./users/profile', {
            user: req.session.userLogged
        });

    },

    registro: (req, res) => {
        req.cookies;
        res.render('./users/register');

    },
    newUser: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        db.User.findAll()
            .then(allUsers => {
                let result = allUsers.find(oneUser => oneUser['email'] === req.body.email)

                if (result) {
                    return res.render('./users/register', {
                        errors: {
                            email: {
                                msg: 'Este E-mail ya se encuentra registrado'
                            }
                        },
                        oldData: req.body
                    });
                }
                let newUser = {
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: req.file.filename,
                };

                User.create(newUser);
                return res.redirect('/login');
            });

    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    admin: (req, res) => {
        return res.render('./users/admin');
    },

    //prueba db
    userAdmin: (req, res) => {
        db.User.findAll()
            .then(data => {
                res.render('./users/users', { users: data })
            })
    },
    edit: (req, res) => {

        db.User.findAll({
            include: ['roles']

        })
            .then(users => {
                db.Role.findAll()
                    .then(roles => {
                        for (let i = 0; i < users.length; i++) {
                            if (users[i].id == req.params.id) {
                                db.User.findByPk(users[i].id)
                                    .then(user => (
                                        res.render('./users/editUser', { user: user, roles: roles })));
                            }
                        }

                    })
            })
    },
    update: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('./users/editUser', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        db.User.update(
            req.body,
            {
                where: { id: req.params.id }
            })
            .then(() => {
                res.redirect('/admin/users');
            })
    },

    destroy: (req, res) => {
        db.User.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/admin/users');
    }

}

module.exports = usersController;