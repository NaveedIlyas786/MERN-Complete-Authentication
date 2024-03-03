const mongoose =require("mongoose");

const DB = "mongodb://127.0.0.1:27017/MERNAuthentication?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5";

mongoose.connect(DB).then(()=>{
    console.log("Database Connected!");
}).catch((error)=>{
    console.log("Error is here: ",error);
})



