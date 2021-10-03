module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        category: {
            type: DataTypes.INTEGER
        }

    };

    let config = {
        tableName: "hotelCategories",
        timestamps: false
    };

    const HotelCategory = sequelize.define("HotelCategory", cols, config);

    return HotelCategory;
};