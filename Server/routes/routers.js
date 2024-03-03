const express =require("express");

const router = new express.Router();
const userdb =require("../models/userSchema");

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
            console.log("storeUser",storeUser);
            res.json({message: "User registered successfully"});
        }
    } catch (error) {
        console.log("Catch Block Error!");
        return res.status(500).json({error: "Something went wrong!"});
    }
})

module.exports = router;
