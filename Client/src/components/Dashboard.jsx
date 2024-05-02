import React, { useContext, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
const Dashboard = () => {
  const navigate = useNavigate()
  
  const {loginData, setLoginData} = useContext(LoginContext);
// console.log(loginData);

  const DashboardValild = async function () {
    //! Here we will validate the user caomparing token with valid user Api
    let GettingToken = localStorage.getItem("usersDataToken");
    console.log("GettingToken:",GettingToken);
    const response =await fetch("https://mern-full-authentication-server.vercel.app/validuser",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": GettingToken
      } 
    });

    const data = await response.json();
    console.log("token:",data);
    if(data.status == 401 || !data){
      navigate("*")
    }else{
      console.log("User Verify !");
      setLoginData(data)
      navigate("/dash")
    }
  };

  useEffect(() => {
    DashboardValild();
  }, []);

  const gofun=() => {
    navigate('/extra')
  }


  return (
    <>
      <div className="dashSection">
        <img
          src="../../src/assets/profile.jpg"
          style={{ width: "200px", marginTop: 20 }}
          alt=""
        />
        <h3>
          User Email: <span>{loginData ? loginData?.validUserOne?.email : ""}</span>
        </h3>
          <button className="btn btn-danger" onClick={()=> gofun()}>Extra</button>
      </div>
    </>
  );
};

export default Dashboard;
