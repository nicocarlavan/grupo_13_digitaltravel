module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
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

    Cart.associate = function (models) {
        Cart.hasMany(models.CartItem, {
            as: "cartItems",
            foreignKey: "cart_id"
        });

        Cart.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        });
    }

    return Cart;
};