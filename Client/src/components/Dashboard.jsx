import React, { useContext, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { loginContext } from "./ContextProvider/Context";
const Dashboard = () => {
  const navigate = useNavigate()
  
  const {loginData, setloginData} = useContext(loginContext);
console.log(loginData);

  const DashboardValild = async function () {


    //! Here we will validate the user caomparing token with valid user Api
    let GettingToken = localStorage.getItem("usersDataToken");
    const response =await fetch("http://localhost:8009/validuser",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": GettingToken
      } 
    });

    const data = await response.json();
    if(data.status===401 || !data){
      navigate("*")
    }else{
      setloginData(data)
      navigate("/dash")
    }
  };

  useEffect(() => {
    DashboardValild();
  }, []);
  return (
    <>
      <div className="dashSection">
        <img
          src="../../src/assets/profile.jpg"
          style={{ width: "200px", marginTop: 20 }}
          alt=""
        />
        <h3>
          User Email: <span>{loginData ? loginData.validUserOne.email : ""}</span>
        </h3>
      </div>
    </>
  );
};

export default Dashboard;
