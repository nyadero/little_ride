module.exports = (Sequelize, DataTypes) => {
    const Likes = Sequelize.define("Likes", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        }
    });


    Likes.associate = (models) => {
        Likes.belongsTo(models.Posts, {
            onDelete: "cascade",
        })

        
      Likes.belongsTo(models.Profile,  {
        onDelete: "cascade",
    })
    }

    return Likes;
}