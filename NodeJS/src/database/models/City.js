module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city: {
            type: DataTypes.STRING
        }

    };

    let config = {
        tableName: "cities",
        timestamps: false
    };

    const City = sequelize.define("City", cols, config);


    City.associate = function (models) {
        City.hasMany(models.Hotel, {
            as: "hotels",
            foreignKey: "city_id"
        });
    }

    return City;
};