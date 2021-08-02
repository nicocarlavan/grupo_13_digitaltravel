const productsController = {
    detalle: (req, res) => {
        res.render('./products/productDetail')

    },
    cart: (req, res) => {
        res.render('./products/cart')

    },

    edicion: (req, res) => {
        let edit = {
            id: '',
            name: '',
            description: '',
            image: '',
            category: '',
            price: '',
        };
        edit.id = req.params.id;
        res.render('./products/edicion', { 'editInfo': edit })
    }

}

module.exports = productsController;

