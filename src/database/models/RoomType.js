module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING
        }

    };

    let config = {
        tableName: "roomTypes",
        timestamps: false
    };

    const RoomType = sequelize.define("RoomType", cols, config);

    return RoomType;
};