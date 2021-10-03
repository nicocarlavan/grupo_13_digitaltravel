module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
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
        }
    };

    let config = {
        tableName: "hotels",
        timestamps: false
    };

    const Hotel = sequelize.define("Hotel", cols, config);

    return Hotel;
};