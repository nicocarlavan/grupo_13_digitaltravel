module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hotel_id: {
            type: DataTypes.INTEGER
        },
        roomType_id: {
            type: DataTypes.INTEGER
        },
        roomCategory_id: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        discountRate: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        }

    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define("Product", cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Hotel, {
            as: "hotel",
            foreignKey: "hotel_id"
        });

        Product.belongsTo(models.RoomType, {
            as: "roomType",
            foreignKey: "roomType_id"
        });

        Product.belongsTo(models.RoomCategory, {
            as: "roomCategory",
            foreignKey: "roomCategory_id"
        });

        Product.hasMany(models.CartItem, {
            as: "cartItems",
            foreignKey: "product_id"
        });
    }


    return Product;
};