const {Likes, Profile} = require("../../models");

// get likes for a post
exports.getPostLikes = async (req, res) => {
    const {postId} = req.params;
    try {
        const likes = await Likes.findAll({where: {PostId: postId}});
        res.json(likes)
    } catch (error) {
        console.log(error)
    }
}

// like a post
exports.likePost = async (req, res) => {
    const {postId} = req.params;
    console.log({posId: postId});
    const UserId = req?.user?.id;
    try {
        // find profile
        const profile = await Profile.findOne({where: {UserId}});
        // find if the post is liked or not 
        const isLiked = await Likes.findOne({where: {UserId, ProfileId: profile.id, PostId: postId}});
        if(!isLiked){
            const like = await Likes.create({ProfileId: profile.id, UserId: UserId, PostId: postId});
            res.json({liked: true});
        }else{
            const dislike = await Likes.destroy({where: {ProfileId: profile.id, UserId: UserId, PostId: postId}});
            res.json({liked: false})
        }
    } catch (error) {
        console.log(error);
    }
}