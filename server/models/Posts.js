module.exports = (Sequelize, DataTypes) => {
    const Posts = Sequelize.define("Posts", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        post_creator: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_file: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Posts.associate = (models) => {
        Posts.belongsTo(models.Profile,  {
            onDelete: "cascade"
        });

        Posts.hasMany(models.Comments,  {
            onDelete: "cascade"
        });

        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        }
        );
    }

    return Posts;
}