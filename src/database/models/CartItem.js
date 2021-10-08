module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        cart_id: {
            type: DataTypes.INTEGER
        },
        inDate: {
            type: DataTypes.DATE
        },
        outDate: {
            type: DataTypes.DATE
        },
        created_at: {
            type: DataTypes.DATE
        }
    };

    let config = {
        tableName: "cartItems",
        timestamps: false
    };

    const CartItem = sequelize.define("CartItem", cols, config);

    CartItem.associate = function (models) {
        CartItem.belongsTo(models.Cart, {
            as: "carts",
            foreignKey: "cart_id"
        });

        CartItem.belongsTo(models.Product, {
            as: "products",
            foreignKey: "products_id"
        });
    }


    return CartItem;
};