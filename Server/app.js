const express = require("express");
const router = require("./routes/routers");
const cors =require("cors");
const cookieparser = require("cookie-parser");
require("./db/connection")  //! importing the db connection file.

const app = express();
const port =8009;

// //! Setting path and getting response from server at web page
// app.get("/",(req,res)=>{
//     res.status(201).json("Server Created");
// })

app.use(express.json()); //? This is used to show the data in JSON form coming from frontend side
app.use(cors());         //? Use here for recieving data from frontend side means from different port number
app.use(router);         //? use here for implementing the routing
app.use(cookieparser());
app.listen((port),()=>{
    console.log(`Server is running on port ${port}`);
})