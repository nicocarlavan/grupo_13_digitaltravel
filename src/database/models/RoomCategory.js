module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING
        }

    };

    let config = {
        tableName: "roomCategories",
        timestamps: false
    };

    const RoomCategory = sequelize.define("RoomCategory", cols, config);

    return RoomCategory;
};