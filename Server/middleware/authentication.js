const jwt =require('jsonwebtoken');
const userdb = require("../models/userSchema");
const secretKey = "abcdefghijklmnopqrstuvwxwz12345";

const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        const verifytoken = jwt.verify(token, secretKey)
        console.log("verfiy:",verifytoken);
        //? After verify the token, we will get that user comparing ids  
        const routeUser= await userdb.findOne({_id: verifytoken._id}) 
        console.log("rootUser",routeUser);
        //? Now we shall send the response but before we should set this logic if not exist
        if(!routeUser){throw new Error("User Not found!")}
        req.token = token;
        req.rootUser = routeUser;
        req.userID = routeUser._id
       next()
       
    }

     catch (error) {
        res.status(401).json({status: 401, message: "Unautorized, No token found"})
    }


}

module.exports = authenticate;