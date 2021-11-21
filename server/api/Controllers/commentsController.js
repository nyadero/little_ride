const {Comments, Users, Profile} = require("../../models")

// add comment
exports.addComment = async (req, res) => {
    const {comment_body, id} = req.body;
    console.log(req.body);
    try {
        // find profile
        const profile = await Profile.findOne({where: {UserId: req.user?.id}});
       const comment = await Comments.create({comment_body:comment_body, PostId: id, UserId: req.user.id, ProfileId: profile.id});
       res.json(comment)
    } catch (error) {
        console.log(error);
    }
}

// get comments
exports.getComments = async (req, res) => {
    const {postId} = req.params;
    try {
       const comments = await Comments.findAll({where: {PostId : postId}, order: [["createdAt", "DESC"]], include: [Profile]});
       if(!comments.length) return res.json({message: "No comments for this post"});
       res.json(comments);
    } catch (error) {
        console.log(error);
    }
}