const productsController = {
    detalle: (req, res) => {
        res.render('./products/productDetail')

    },
    cart: (req, res) => {
        res.render('./products/cart')

    }

}

module.exports = productsController;

