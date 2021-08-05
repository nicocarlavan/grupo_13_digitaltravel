const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    index: (req, res) => {
        res.render('./products/products', { products: products });
    },
    detalle: (req, res) => {
        let product = products.find(element => element.id == req.params.id);
        res.render('./products/productDetail', { product: product })

    },
    cart: (req, res) => {
        res.render('./products/cart')

    },

    edicion: (req, res) => {
        let edit = {
            id: '',
            name: '',
            price: '',
            room: '',
            category: '',
            city: '',
            description: '',
            image: '',
            discount: '',
        };
        edit.id = req.params.id;
        res.render('./products/edicion', { 'editInfo': edit })
    }

}

module.exports = productsController;

