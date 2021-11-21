module.exports = (Sequelize, DataTypes) => {
    const Comments = Sequelize.define("Comments",  {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        }, 
        comment_body : {
           type: DataTypes.STRING,
           allowNull: false,
        }
    });

    Comments.associate = (models) => {
      Comments.belongsTo(models.Profile,  {
        onDelete: "cascade",
    })

    Comments.belongsTo(models.Posts, {
        onDelete: "cascade",
    });

    }

    return Comments;
}