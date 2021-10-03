module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING
        }

    };

    let config = {
        tableName: "roles",
        timestamps: false
    };

    const Role = sequelize.define("Role", cols, config);

    return Role;
};