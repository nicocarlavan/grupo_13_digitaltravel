const productsController = {
    detalle: (req, res) => {
        res.render('./products/productDetail')

    },
    cart: (req, res) => {
        res.render('./products/cart')

    },

    edicion: (req, res) => {
        res.render ('./products/edicion')
    }

}

module.exports = productsController;

