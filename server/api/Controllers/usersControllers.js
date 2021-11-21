const Sequelize = require("sequelize")
const { Users, Profile } = require("../../models");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const sharp =require("sharp")

// register user controller
exports.registerUser = async (req, res) => {
  const {first_name, last_name, handle, email, password, confirmPassword} = req.body;
  try {
      console.log(req.body);
    //   find if a user with a similar email or handle exists
    const isExisting = await Users.findOne({where: {
        [Op.or] : [
            {email},
            {handle}
        ]
    } });

    if(isExisting) return res.status(200).json({message: "A user with a similar email or handle exists"});
    // compare passwords
     if(password !== confirmPassword) return res.status(200).json({message: "Passwords do not match"}); 
    //  hash the password
    const hashedPassword = await bcrypt.hash(password, 15);
    // finally register the user
    const user = await Users.create({name: `${first_name} ${last_name}`, email, password: hashedPassword, handle });
    // generate token on successful signup/registration
    const token = jwt.sign({email: user.email, uuid: user.uuid, id: user.id, handle: user.handle}, "secret", {expiresIn: "48h"});
    // send user and token back 
    res.status(200).json({token, result: user});
  } catch (error) {
      console.log(error);
  }
}

// login user controller
exports.loginUser = async (req, res) => {
   const {handle, password} = req.body;
   try {
    //    find  if the user exists
    const user = await Users.findOne({where: {handle}, include: [Profile] });
    if(!user) return res.status(200).json({message: "Sorry this user does'nt exist"});
    // compare user password and the one in database 
    const isPasswordsMatching = await bcrypt.compare(password, user.password);
    if(!isPasswordsMatching) return res.status(200).json({message: "Incorrect user password"});
    // generate token
    const token = jwt.sign({email: user.email, handle: user.handle, uuid: user.uuid, id: user.id}, "secret", { expiresIn: "48h"});
    // find users profile
    const profile = await Profile.findOne({where: {UserId: user.id}})
    // return back the user and token
    res.status(200).json({token, result: user});
   } catch (error) {
       console.log(error);
   }
}

// create profile
exports.createProfile = async (req, res) => {
    let profilePic;
    let uploadPath;
    let compressedFilePath;
    const {profile_about, profile_url} = req.body;
    try {
        profilePic = req.files.profile_image;
        if(!req.files || Object.keys(req.files).length === 0) return res.json({message: "No files selected"});
        // upload path
        uploadPath = __dirname + "../../../profileuploads/profile-uploads/" + profilePic.name;
        // compressed file path
        compressedFilePath = __dirname + "../../../images/" + profilePic.name;
        // move the files to the profile-uploads folder
        profilePic.mv(uploadPath, async () => {
            // compress file
            sharp(uploadPath).resize(200, 200, {fit: "cover", position: "center", fastShrinkOnLoad: true}).toFile(
                compressedFilePath, (err, info) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(info);
                    }
                }
            )
            try {
                const profile = await Profile.create({profile_about, profile_url, profile_image: profilePic.name, UserId: req.user.id})
                console.log(req.user.id);
                res.json(profile)
            } catch (error) {
                console.log(error);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// get profile
exports.getProfile = async (req, res) => {
    const {UserId} = req.params;
    console.log({userid: UserId});
    try {
        const profile = await Profile.findOne({where: {UserId: UserId}});
        if(!profile){
            res.json({message: "You do not have a profile please create one"})
        }else{
            res.json(profile)
        }
    } catch (error) {
        console.log(error);
    }
}