const jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if(!token){
        return res.status(404).json({message: "You are not logged in"});
    }
    try {
        const validToken = await jwt.verify(token, "secret");
        console.log(validToken);
        req.user = validToken;
        console.log(req.user);
        next();
    } catch (error) {
        console.log({Error: error});
    }
   
}

module.exports = {authMiddleWare}