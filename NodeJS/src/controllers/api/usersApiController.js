const db = require('../../database/models');

module.exports = {

    list: (req, res) => {
        db.User.findAll()
            .then(result => {
                users = []
                result.forEach(user => {
                    let aux = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        image: 'http://localhost:3000/images/users/' + user.image,
                        detail: 'http://localhost:3000/api/users/' + user.id
                    }
                    users.push(aux);
                });
                let respuesta = {
                    meta: {
                        status: 200,
                        count: users.length,
                        url: 'http://localhost:3000/api/users'
                    },
                    data: users
                }

                res.json(respuesta);
            })
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(result => {
                let respuesta = {}
                if (result) {
                    let user = {
                        id: result.id,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        image: 'http://localhost:3000/images/users/' + result.image
                    }
                    respuesta = {
                        meta: {
                            status: 200,
                            count: user.length,
                            url: 'http://localhost:3000/api/users/' + user.id
                        },
                        data: user
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 404,
                            msg: 'User not found'
                        }
                    }
                }

                res.json(respuesta);
            })
    }

}