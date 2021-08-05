const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const homeController = {
    home: (req, res) => {
        let discountProducts = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].discount == 'true') {
                discountProducts.push(products[i]);
            }
        }
        res.render('home', { discountProducts: discountProducts })

    },

}

module.exports = homeController;

