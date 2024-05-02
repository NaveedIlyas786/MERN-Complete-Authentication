const mongoose =require("mongoose");

// const DB = "mongodb://127.0.0.1:27017/MERNAuthentication?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5";
const DB = "mongodb+srv://naveedilyas321:pingpong1122?@cluster0.kftvyxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB).then(()=>{
    console.log("Database Connected!");
}).catch((error)=>{
    console.log("Error is here: ",error);
})



