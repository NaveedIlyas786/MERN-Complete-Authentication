const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken")
const secretKey = "abcdefghijklmnopqrstuvwxwz12345";
const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true }, //trim is used for removing extra spaces
  email: {
    type: String,
    unique: true,
    required: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not Valid Email!");
        // message: "Not a valid email!"
      }
    },
  }, //?Unique is used for having unique emails
  password: { type: String, required: true, minlength: 6 },
  cpassword: { type: String, required: true, minlength: 6 },
  tokens: [ //? Token is used at the time of login for the user authentication
    {
      token: { type: String, required: true },
    },
  ],
});


userSchema.pre("save", async function(next){
  if(this.isModified("password")){

    this.password = await bcrypt.hash(this.password,12);  //? Here 12 means roundes, means how many words, our password hashing would contain ( more rounds more password strong)
    this.cpassword = await bcrypt.hash(this.cpassword,12);
  }
  next() //? proceed to routers.js file
})
//? Here "userSchema.pre("save")" means that before saving the user data, do this action


//! Generate Token
 userSchema.methods.generateAuthtoken = async function(){
  try {
    //? here we shall write the user ID and secret Key
    let generatedToken = jwt.sign({_id:this._id}, secretKey,{
      //? Here we shall mention the expiry of token after generating
expiresIn : "1d",
    })

    //? here "tokens" word is coming from userSchema described upperside
    this.tokens = this.tokens.concat({token:generatedToken})
    await this.save();
    return generatedToken
  } catch (error) {
    throw error;
  }
 }
//! Creating the Modal
//? This line would be added after password Hashing Strategy!

const userDB = new mongoose.model("authUsers",userSchema);

module.exports = userDB;


