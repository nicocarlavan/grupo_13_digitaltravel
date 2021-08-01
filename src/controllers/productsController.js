const productsController = {
    detalle: (req, res) => {
        res.render('./products/productDetail')

    },
    cart: (req, res) => {
        res.render('./products/cart')

    },

    edicion: (req, res) => {
        let edit = {
            name: '',
            description: '',
            image:'',
            category:'',
            price: '',
        }
        res.render ('./products/edicion', { 'editInfo': edit})
    }

}

module.exports = productsController;

