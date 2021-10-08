module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    RoomType.associate = function (models) {
        RoomType.hasMany(models.Product, {
            as: "products",
            foreignKey: "roomType_id"
        });
    }

    return RoomType;
};