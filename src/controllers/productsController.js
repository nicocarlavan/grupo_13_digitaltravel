const fs = require('fs');
const path = require('path');
const { REPL_MODE_SLOPPY } = require('repl');
const db = require('../database/models');
const Op = db.Sequelize.Op;

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
        res.render('./products/cart')

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

        db.Product.update(
            req.body,
            {
                where: { id: req.params.id }
            })
            .then(() => {
                res.redirect('/products/detail/' + req.params.id)
            })
    },

    store: (req, res) => {
        db.Product.create(
            req.body
        )
            .then(res.redirect('/products/')
            );
    },

    destroy: (req, res) => {
        db.Product.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/products');
    }

}

module.exports = productsController;

