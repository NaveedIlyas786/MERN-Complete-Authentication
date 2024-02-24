const express = require("express");

const app = express();
const port =8009;

//! Setting path and getting response from server at web page
app.get("/",(req,res)=>{
    res.status(201).json("Server Created");
})


app.listen((port),()=>{
    console.log(`Server is running on port ${port}`);
})