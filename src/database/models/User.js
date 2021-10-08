module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        role_id: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        }

    };

    let config = {
        tableName: "users",
        timestamps: false
    };

    const User = sequelize.define("User", cols, config);

    User.associate = function (models) {

        User.belongsTo(models.Role, {
            as: "roles",
            foreignKey: "role_id"
        });

        User.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "user_id"
        });
    }


    return User;
};