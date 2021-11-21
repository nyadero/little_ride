module.exports = (Sequelize, DataTypes) => {
    const Users = Sequelize.define("Users", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        handle : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Users.associate = (models) => {
        Users.hasOne(models.Profile, {
            onDelete: "cascade",
        });

        Users.hasOne(models.Comments, {
            onDelete: "cascade",
        });

        Users.hasOne(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasOne(models.Posts, {
            onDelete: "cascade",
        });
    }
    
    return Users;
}