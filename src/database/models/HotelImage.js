module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING
        },
        hotel_id: {
            type: DataTypes.INTEGER
        }

    };

    let config = {
        tableName: "hotelImages",
        timestamps: false
    };

    const HotelImage = sequelize.define("HotelImage", cols, config);

    return HotelImage;
};