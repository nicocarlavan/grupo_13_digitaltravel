module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        hotelCategory_id: {
            type: DataTypes.INTEGER
        },
        city_id: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "hotels",
        timestamps: false
    };

    const Hotel = sequelize.define("Hotel", cols, config);

    Hotel.associate = function (models) {
        Hotel.belongsTo(models.HotelCategory, {
            as: "hotelCategories",
            foreignKey: "hotelCategory_id"
        });

        Hotel.belongsTo(models.City, {
            as: "cities",
            foreignKey: "city_id"
        });
    }

    return Hotel;
};