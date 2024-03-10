import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";
import { loginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { loginData, setloginData } = useContext(loginContext);
const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const GoErrorPage = () => {
    navigate("*")
  };
  const GoDashPage = () => {
    navigate("/dash")
  };
  
  const LogoutUser = async() => {
        //! Here we will get the user and logout him
        let GettingToken = localStorage.getItem("usersDataToken");
        const response =await fetch("http://localhost:8009/logout",{
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            "Authorization": GettingToken,
            "Accept": "application/json",
          }, 
          // credentials: "include" //? b/c we also want to remove the cookie
        });
    
        const data = await response.json();
        console.log("data",data);
        if(data.status ==201){
          console.log("User Logout!");
          localStorage.removeItem("usersDataToken");
          
          setloginData(false)
          navigate("/")
        }else{
          console.log("Error");
        }
  };


  return (
    <>
      <header>
        <nav>
          <h1>MERN AUTH</h1>
          <div className="avtar">
            {loginData?.validUserOne ? (
              <Avatar
                onClick={handleClick}
                style={{ backgroundColor: "#eb1414dd", color: "#FFFFFF" }}
              >
                {loginData.validUserOne?.name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar onClick={handleClick} />
            )}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {loginData?.validUserOne ? (
                <div>
                  <MenuItem onClick={()=>{
                    handleClose()
                    GoDashPage()
                    }} >Profile</MenuItem>
                  <MenuItem onClick={()=>{
                    handleClose()
                    LogoutUser()
                  }}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                <MenuItem onClick={()=>{
                handleClose()
                GoErrorPage()
              }}>Profile</MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
