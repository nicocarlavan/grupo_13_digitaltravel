const productsController = {
    detalle: (req, res) => {
        res.render('productDetail')

    },
    cart: (req, res) => {
        res.render('cart')

    }

}

module.exports = productsController;

