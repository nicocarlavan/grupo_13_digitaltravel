module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    Role.associate = function (models) {
        Role.hasMany(models.User, {
            as: "users",
            foreignKey: "role_id"
        });
    }

    return Role;
};