const fs = require('fs');
const path = require('path');
const { REPL_MODE_SLOPPY } = require('repl');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');
const { Console } = require('console');
const mercadoPago = require('mercadopago');
const moment = require('moment')



mercadoPago.configure({
    access_token: 'APP_USR-806615732184603-111415-85e1325dcb0014d097c9b8d13e67c539-1018907559'
});

//const productsFilePath = path.join(__dirname, '../data/products.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
    index: (req, res) => {

        db.Product.findAll({
            include: [{ model: db.Hotel, as: 'hotel', include: ['cities', 'hotelCategories'] }, 'roomType', 'roomCategory']

        })
            .then(products => {
                res.render('./products/products', { products: products });
            })

    },
    indexSearch: (req, res) => {

        db.Hotel.findAll({
            //include: [{ model: db.Hotel, as: 'hotel', include: ['cities', 'hotelCategories'] }, 'roomType', 'roomCategory'],
            where: {
                name: { [Op.like]: '%' + req.body.search + '%' }
            }
        }).then(hotels => {
            let hotelsId = [];
            hotels.forEach(hotel => {
                hotelsId.push(hotel.id)
            });

            db.Product.findAll({
                include: [{ model: db.Hotel, as: 'hotel', include: ['cities', 'hotelCategories'] }, 'roomType', 'roomCategory'],
                where: {
                    hotel_id: { [Op.in]: hotelsId }
                }
            })
                .then(result => {
                    console.log(result);
                    res.render('./products/products', { products: result });
                });
        })



    },
    sale: (req, res) => {
        db.Product.findAll({
            include: [{ model: db.Hotel, as: 'hotel', include: ['cities', 'hotelCategories'] }, 'roomType', 'roomCategory']

        })
            .then(data => {
                let sale = data.filter(product => product.discountRate !== 0);
                res.render('./products/products', { products: sale });
            })

    },
    detalle: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ['hotel', 'roomType', 'roomCategory']
        })
            .then(product => {
                db.City.findByPk(product.hotel.city_id)
                    .then(city => {

                        res.render('./products/detail', { product: product, city: city })

                    })


            });
    },
    cart: (req, res) => {
        db.Cart.findAll({
            include: [{ model: db.CartItem, as: 'cartItems', include: ['products', 'carts'] }, 'users'],
            where: {
                user_id: req.session.userLogged.id,
                paid: 0
            }
        })
            .then(result => {
                db.CartItem.findAll({
                    include: [{ model: db.Product, as: 'products', include: ['hotel', 'roomType', 'roomCategory'] }, 'carts'],
                    where: { cart_id: result[0].id }
                }).then(cartItems => {
                    let daysQuantity = [];

                    for (let i = 0; i < cartItems.length; i++) {
                        let fechaIn = moment(cartItems[i].inDate);
                        let fechaOut = moment(cartItems[i].outDate);

                        daysQuantity.push(fechaOut.diff(fechaIn, 'days'))
                    }

                    res.render('./products/cart', { cartItems: cartItems, daysQuantity: daysQuantity });
                })

            })
    },

    addItemTocart: (req, res) => {
        db.Cart.findAll({
            include: [{ model: db.CartItem, as: 'cartItems', include: ['products', 'carts'] }, 'users'],
            where: {
                user_id: req.session.userLogged.id,
                paid: 0
            }
        })
            .then(cart => {
                db.CartItem.create({
                    product_id: req.body.id,
                    cart_id: cart[0].id,
                    inDate: req.body.inDate,
                    outDate: req.body.outDate
                })
                    .then(result => {
                        db.CartItem.findAll({
                            include: [{ model: db.Product, as: 'products', include: ['hotel', 'roomType', 'roomCategory'] }, 'carts'],
                            where: {
                                cart_id: result.cart_id,
                            }
                        }).then(cartItems => {

                            let daysQuantity = [];

                            for (let i = 0; i < cartItems.length; i++) {
                                let fechaIn = moment(cartItems[i].inDate);
                                let fechaOut = moment(cartItems[i].outDate);

                                daysQuantity.push(fechaOut.diff(fechaIn, 'days'))
                            }

                            res.render('./products/cart', { cartItems: cartItems, daysQuantity: daysQuantity });
                        })

                    })

            });

    },

    edit: (req, res) => {

        db.Product.findAll({
            include: ['hotel', 'roomType', 'roomCategory']

        })
            .then(products => {
                db.RoomType.findAll()
                    .then(roomTypes => {
                        db.RoomCategory.findAll()
                            .then(roomCategories => {

                                if (req.params.id != undefined) {

                                    for (let i = 0; i < products.length; i++) {
                                        if (products[i].id == req.params.id) {
                                            db.Hotel.findByPk(products[i].hotel_id)
                                                .then(hotel => (
                                                    res.render('./products/edit', { product: products[i], hotels: hotel, types: roomTypes, categories: roomCategories })));
                                        }
                                    }

                                } else {
                                    db.Hotel.findAll()
                                        .then(hotel => (
                                            res.render('./products/edit', { product: undefined, hotels: hotel, types: roomTypes, categories: roomCategories })))
                                }
                            })
                    })
            })
    },

    update: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            db.Product.findAll({
                include: ['hotel', 'roomType', 'roomCategory']

            })
                .then(products => {
                    db.RoomType.findAll()
                        .then(roomTypes => {
                            db.RoomCategory.findAll()
                                .then(roomCategories => {

                                    for (let i = 0; i < products.length; i++) {
                                        if (products[i].id == req.params.id) {
                                            db.Hotel.findByPk(products[i].hotel_id)
                                                .then(hotel => (
                                                    res.render('./products/edit', {
                                                        product: products[i], hotels: hotel, types: roomTypes, categories: roomCategories,
                                                        errors: resultValidation.mapped(),
                                                        oldData: req.body
                                                    })));
                                        }
                                    }

                                })
                        })
                })

        } else {
            db.Product.update(
                req.body,
                {
                    where: { id: req.params.id }
                })
                .then(() => {
                    res.redirect('/products/detail/' + req.params.id)
                })
        }
    },

    store: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            db.Product.findAll({
                include: ['hotel', 'roomType', 'roomCategory']

            })
                .then(products => {
                    db.RoomType.findAll()
                        .then(roomTypes => {
                            db.RoomCategory.findAll()
                                .then(roomCategories => {
                                    db.Hotel.findAll()
                                        .then(hotel => (
                                            res.render('./products/edit', {
                                                product: undefined, hotels: hotel, types: roomTypes, categories: roomCategories,
                                                errors: resultValidation.mapped(),
                                                oldData: req.body
                                            })))
                                })
                        })
                })
        }
        else {
            db.Product.create(
                req.body
            )
                .then(res.redirect('/products/')
                );
        }

    },

    destroy: (req, res) => {
        db.Product.destroy({
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/products');
            })

    },

    deleteItem: (req, res) => {
        db.CartItem.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/products/cart');
    },
    checkOut: (req, res) => {
        db.Cart.findAll({
            include: [{ model: db.CartItem, as: 'cartItems', include: ['products', 'carts'] }, 'users'],
            where: {
                user_id: req.session.userLogged.id,
                paid: 0
            }
        })
            .then(result => {
                db.CartItem.findAll({
                    include: [{ model: db.Product, as: 'products', include: ['hotel', 'roomType', 'roomCategory'] }, 'carts'],
                    where: { cart_id: result[0].id }
                }).then(cartItems => {

                    let items = []
                    let daysQuantity = [];
                    for (let i = 0; i < cartItems.length; i++) {
                        let fechaIn = moment(cartItems[i].inDate);
                        let fechaOut = moment(cartItems[i].outDate);
                        daysQuantity.push(fechaOut.diff(fechaIn, 'days'))
                        items.push({
                            id: cartItems[i].cart_id,
                            title: cartItems[i].products.hotel.name,
                            description: cartItems[i].products.roomType.type + ' ' + cartItems[i].products.roomCategory.category,
                            unit_price: cartItems[i].products.price * daysQuantity[i],
                            quantity: 1,
                        })
                    }
                    let preference = {
                        items: items,
                        back_urls: {
                            success: "https://www.mercadopago.com.ar/activities#from-section=home",
                        },/*
                        payer: {
                            name: req.session.userLogged.firstName,
                            surname: req.session.userLogged.lastName,
                            email: req.session.userLogged.email,
                        },*/
                        auto_return: "approved",
                        payment_methods: {
                            "installments": 12
                        }
                        //notification_url: "https://www.your-site.com/ipn"
                    }

                    mercadoPago.preferences.create(preference)
                        .then(function (response) {
                            db.Cart.update(
                                {
                                    paid: 1
                                },
                                {
                                    where: {
                                        user_id: req.session.userLogged.id,
                                        paid: 0
                                    }
                                })
                                .then(() => {
                                    db.Cart.create({
                                        user_id: req.session.userLogged.id,
                                        paid: 0
                                    })
                                        .then(res.redirect(response.body.init_point))

                                })

                        })
                        .catch(error => console.log('Error: ' + error))

                })


            })


    }

}

module.exports = productsController;

