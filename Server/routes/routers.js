const express =require("express");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const userdb =require("../models/userSchema");
const authenticate= require("../../Server/middleware/authentication");

router.post('/register', async(req,res)=>{
    const {name,email,password,cpassword} = req.body;
    if(!name || !email || !password || !cpassword){
        return res.status(422).json({error:"Please Fill all the fields!"});
    }
    try {
        const preUser = await userdb.findOne({email:email})
        if(preUser){
            return res.status(422).json({error: "This email is already exists!"});
        }else if(password !== cpassword){
            return res.status(422).json({error: "Password and CPassword Not Matched!"});
        }else{
            const finalUser = new userdb({
                name,email,password,cpassword
            });
            const storeUser = await finalUser.save();
            console.log("User registered successfully");
            return res.status(201).json({status:201,  storeUser});
        }
    } catch (error) {
        console.log("Catch Block Error!");
        return res.status(500).json({error: "Something went wrong!"});
    }
})

//! Login Side Api Creation 
//? For checking purposes is data is sending from login side

router.post('/login',async(req, res)=>{
    const {email,password} = req.body;
    if(!email || !password ){
        return res.status(422).json({error:"Please Fill all the fields!"});
    }
    try {
        const validUser = await userdb.findOne({email: email});
        console.log("validUser",validUser);

        //todo:  if user exist with this email then get that user object in "validUser" variable
        if (validUser) {
            const isMatch = await bcrypt.compare(password, validUser.password) //? here 1st "password" is of user entered and 2nd one is from database
            if(!isMatch) {
                res.status(422).json({error:"Invalid Details! Password Not Matched"});
            }else{
                //? then we shall create the JWT token means jwt token utilization will implement here
                //? Here we shall see, how we can save the jwt token in headers, and verify from there
                //todo: Token Generate
                //? we shall generate this function "generateAuthtoken" in userSchema right after password hashing
                const Storedtoken = await validUser.generateAuthtoken();
                //? here the generated token value would be stored in "Storedtoken"  after calling "generateAuthtoken()" function
                console.log("Storedtoken", Storedtoken);
                //! After the generated token we shall also generate the "cookie" value
            res.cookie("userCookie: ", Storedtoken,{
                //means expires after 15 mints
                expires: new Date(Date.now()+9000000),
                httpOnly : true
            })

            //! Now e shall send reponse to frontend side, using this token user would be authenticated
            const result = {
                validUser,
                Storedtoken
            }
            res.status(201).json({status:201, result})
            
            }
        } else {
           return res.status(401).json({ error: 'Email or Password does not exist' });
           // create a token
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
})


//! User Validity Api Creation

router.post('/validuser',authenticate, async(req,res)=>{
    //? We shall use here middleware function (authenticate) to varify token for user validity
try {
    const validUserOne = await userdb.findOne({_id: req.userID})
    res.status(201).json({status:201, validUserOne})
} catch (error) {
    
    res.status(401).json({status:401, error})
}
})

//!User Logout
//? We also need here "authenticate" function, b/c he/she will not logout if he has not token
router.get("/logout",authenticate, async(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currentElement)=>{
            return currentElement.token !==req.token
        })

        res.clearCookie("userCookie",{path:"/"})
        req.rootUser.save()
        res.status(201).json({status: 201})
    } catch (error) {
        res.status(401).json({status: 401,error})
        console.log(error);
    }
})

module.exports = router;
