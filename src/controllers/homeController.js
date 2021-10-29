const fs = require('fs');
const path = require('path');
const db = require('../database/models');
//const productsFilePath = path.join(__dirname, '../data/products.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const homeController = {
    home: (req, res) => {
        db.Product.findAll({
            include: [{ model: db.Hotel, as: 'hotel', include: ['cities', 'hotelCategories'] }, 'roomType', 'roomCategory']

        })
            .then(data => {
                let sale = data.filter(product => product.discountRate !== 0);
                res.render('home', { discountProducts: sale })
            })

    }

}

module.exports = homeController;

