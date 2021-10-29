const fs = require('fs');
const path = require('path');
const { REPL_MODE_SLOPPY } = require('repl');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');
const { Console } = require('console');

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
                    res.render('./products/cart', { cartItems: cartItems });
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
                if (cart[0]) {
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
                                res.render('./products/cart', { cartItems: cartItems });
                            })

                        })

                } else {
                    db.Cart.create({
                        user_id: req.session.userLogged.id,
                        paid: 0
                    }).then(newCart => {
                        db.CartItem.create({
                            product_id: req.body.id,
                            cart_id: newCart.id,
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
                                    res.render('./products/cart', { cartItems: cartItems });
                                })

                            })
                    })
                }

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
        });
        res.redirect('/products');
    },

    deleteItem: (req, res) => {
        db.CartItem.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/products/cart');
    }

}

module.exports = productsController;

