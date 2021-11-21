module.exports = (Sequelize, DataTypes) => {
   const Profile = Sequelize.define("Profile", {
       uuid: {
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
       },
       profile_about: {
          type:  DataTypes.TEXT,
          allowNull: true,
       },
       profile_image: {
           type: DataTypes.STRING,
           allowNull: true,
       },
       profile_url: {
        type: DataTypes.STRING,
        allowNull: true,
       }
   });

//    Profile.associate = (models) => {
//        Profile.belongsTo(models.Comments, {
//            onDelete: "cascade",
//        });

//        Profile.belongsTo(models.Likes, {
//         onDelete: "cascade",
//     });
    
//    }

   return Profile;
}