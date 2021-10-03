module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
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

    return City;
};