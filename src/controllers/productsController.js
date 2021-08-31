const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


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

    edit: (req, res) => {
        let product = {
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
        let productToEdit = products.find(element => element.id == req.params.id);
        res.render('./products/edit', { 'productToEdit': productToEdit })
    },

    update: (req, res) => {
        products.forEach(element => {
            if (element.id == req.params.id) {//
                element.name = req.body.name
                element.price = req.body.price
                element.room = req.body.room
                element.category = req.body.category
                element.city = req.body.city
                element.description = req.body.description
                element.discount = req.body.discount
            }

        })
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect('/products/productDetail/' + req.params.id)
    },

    store: (req, res) => {
        let newProduct = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            price: req.body.price,
            room: req.body.room,
            category: req.body.category,
            city: req.body.city,
            description: req.body.description,
            image: req.file.filename,
            discount: req.body.discount,
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect('/products/productdetail/' + newProduct.id);
    },

    destroy: (req, res) => {
        products = products.filter(element => element.id != req.params.id)
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect('/products');
    }

}

module.exports = productsController;

