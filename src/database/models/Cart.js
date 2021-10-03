module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        inDate: {
            type: DataTypes.DATE
        },
        outDate: {
            type: DataTypes.DATE
        }
    };

    let config = {
        tableName: "carts",
        timestamps: false
    };

    const Cart = sequelize.define("Cart", cols, config);

    return Cart;
};