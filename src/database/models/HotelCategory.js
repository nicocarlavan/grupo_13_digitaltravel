module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    HotelCategory.associate = function (models) {
        HotelCategory.hasMany(models.Hotel, {
            as: "hotels",
            foreignKey: "hotelCategory_id"
        });
    }

    return HotelCategory;
};