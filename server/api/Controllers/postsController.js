const {Posts,Comments, Likes, Users, Profile} = require("../../models");
const sharp = require("sharp")
const {fn, col} = require("sequelize")

// create post controller
exports.createPost = async (req, res) => {
  const {post_photo, post_text} = req.body;
  try {
     let postPhoto;
     let uploadPath;
     let compressedFilePath;

     if(!req.files || Object.keys(req.files).length === 0){
         return res.json({message: "No files selected"});
     }
     postPhoto = req.files.post_photo;
     console.log(postPhoto.name);
     console.log(req.body);

    uploadPath = __dirname + "../../../profileuploads/post-uploads/" + postPhoto.name;

    // compressed image uploadPath
    compressedFilePath = __dirname + "../../../images/" + postPhoto.name;

    // use mv() function to move the file to the post-uploads
    postPhoto.mv(uploadPath, async () => {
        // compress the file first
        sharp(uploadPath).resize(800, 600, {
            fit: "cover",
            quality: 80,
            position: "center",
            fastShrinkOnLoad: true,
         }).toFile(compressedFilePath, (err, info) =>{
             if(err){
                 console.log({Error: err});
             }else{
                 console.log(info);
             }
         })
        try {
            // find user profile
            const profile = await Profile.findOne({where: {UserId: req.user?.id}})
            const post = await Posts.create({post_text, post_file: postPhoto.name, post_creator: req?.user?.handle, UserId: req?.user?.id, ProfileId: profile?.id});
            res.status(200).json(post);
        } catch (error) {
            console.log(error);
        }
    })
  } catch (error) {
      console.log(error);
  }
}

// get all posts 
exports.getPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({order: [["createdAt", "DESC"]], include: [Profile, Comments, Likes]});
        // const commentsCount = await posts.count()
        console.log(Posts.ProfileId);
        if(posts.length < 1) return res.status(200).json({message: "We couldn't find any posts at the moment"});
        // find the creators profile
        // posts.map((post) => {
        //     console.log(post);
        // })
         res.status(200).json(posts)
    } catch (error) {
        console.log(error);
    }
}