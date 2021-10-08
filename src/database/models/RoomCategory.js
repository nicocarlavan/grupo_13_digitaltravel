module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    RoomCategory.associate = function (models) {
        RoomCategory.hasMany(models.Product, {
            as: "products",
            foreignKey: "roomCategory_id"
        });
    }

    return RoomCategory;
};