import React, { useState } from "react";
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [CpassShow, setCPassShow] = useState(false);

  const [InputValue, setInputValues] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userCPassword: "",
  });

  console.log("Initial Values: ", InputValue);

  const setValues = (e) => {
    const { name, value } = e.target;
    setInputValues(() => {
      return {
        ...InputValue,
        [name]: value,
      };
    });
  };

  const addUserData= (e)=>{
    e.preventDefault()
    const {userName,userEmail,userPassword,userCPassword} = InputValue;

    
    if(userName === ""){
      alert("Please Enter User Name!")
    }
    else if(userEmail === ""){
      alert("Please Enter User Email!")
    }
    else if(!userEmail.includes("@")){
      alert("Please Enter Valid Email!")
    }
    else if(userPassword === ""){
      alert("Please Enter Password!")
    }
    else if(userCPassword === ""){
      alert("Please Enter Confirm Password!")
    }
    else if(userPassword.length < 6 || userCPassword.length < 6){
      return alert("Password Must be 6 Characters!");
    }
    else if(userPassword !== userCPassword){
      return alert("Password Not Matched!");
    }
    else{
console.log("User Registered!");
    }
  }

  return (
    <section>
      <>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p>Hi, we are you glad you are back. Please Register.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                name="userName"
                id="username"
                placeholder="Enter Your Name"
                onChange={setValues}
                value={InputValue.userName}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="userEmail"
                id="email"
                placeholder="Enter Your Email Address"
                onChange={setValues}
                value={InputValue.userEmail}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setValues}
                  value={InputValue.userPassword}
                  placeholder="Enter Password"
                  name="userPassword"
                  id="password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="Cpassword">Confirm Password</label>
              <div className="two">
                <input
                  type={!CpassShow ? "password" : "text"}
                  onChange={setValues}
                  value={InputValue.userCPassword}
                  placeholder="Confirm Password"
                  name="userCPassword"
                  id="Cpassword"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!CpassShow)}
                >
                  {!CpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUserData}>Register</button>
            <p>
              Already have an Account? <a href="/">Login</a>
            </p>
          </form>
        </div>
      </>
    </section>
  );
};

export default Register;
