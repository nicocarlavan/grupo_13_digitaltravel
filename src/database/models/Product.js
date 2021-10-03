module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
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

    return Product;
};