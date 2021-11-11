const db = require('../../database/models');

module.exports = {

    list: (req, res) => {
        db.Product.findAll({
            include: [{ model: db.Hotel, as: 'hotel', include: ['cities', 'hotelCategories'] }, 'roomType', 'roomCategory']
        })
            .then(result => {
                let aux = result;
                let productosPorHotel = {};
                db.Hotel.findAll()
                    .then(hotels => {
                        for (let i = 0; i < hotels.length; i++) {

                            let hotelFiltrado = aux.filter(product => product.hotel_id == hotels[i].id);

                            if (hotelFiltrado) {
                                productosPorHotel = {
                                    ...productosPorHotel,
                                    [hotels[i].name]: hotelFiltrado.length
                                }
                            }

                            aux = result;
                        }
                        products = []
                        result.forEach(product => {
                            let aux = {
                                id: product.id,
                                name: product.hotel.name,
                                roomType: product.roomType.type,
                                roomCategory: product.roomCategory.category,
                                description: product.hotel.description,
                                price: product.price,
                                discountRate: product.discountRate,
                                image: 'http://localhost:3000/images/products/' + product.hotel.image,
                                detail: 'http://localhost:3000/api/products/' + product.id
                            }
                            products.push(aux);
                        });
                        let respuesta = {
                            meta: {
                                status: 200,
                                count: result.length,
                                url: 'http://localhost:3000/api/products/'
                            },
                            data: {
                                count: result.length,
                                countByCategory: productosPorHotel,
                                products: products
                            }
                        }

                        res.json(respuesta);
                    })


            })
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{ model: db.Hotel, as: 'hotel', include: ['cities', 'hotelCategories'] }, 'roomType', 'roomCategory'],
        })
            .then(result => {
                let respuesta = {}
                if (result) {
                    let product = {
                        id: result.id,
                        hotel_id: result.hotel_id,
                        roomType_id: result.roomType_id,
                        roomCategory_id: result.roomCategory_id,
                        price: result.price,
                        discountRate: result.discountRate,
                        createdAt: result.createdAt,
                        image: 'images/products/' + result.hotel.image
                    }
                    respuesta = {
                        meta: {
                            status: 200,
                            count: product.length,
                            url: 'api/products/' + product.id
                        },
                        data: product
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 404,
                            msg: 'Product not found'
                        }
                    }
                }

                res.json(respuesta);
            })
    }

}