module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        cart_id: {
            type: DataTypes.INTEGER
        },
        paid: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
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