import React, { useState } from "react";
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [CpassShow, setCPassShow] = useState(false);

  const [InputValue, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
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

  const addUserData= async(e)=>{
    e.preventDefault()
    console.log("Clicked!");
    const {name,email,password,cpassword} = InputValue;
    
    if(name === ""){
      alert("Please Enter User Name!")
    }
    else if(email === ""){
      alert("Please Enter User Email!")
    }
    else if(!email.includes("@")){
      alert("Please Enter Valid Email!")
    }
    else if(password === ""){
      alert("Please Enter Password!")
    }
    else if(cpassword === ""){
      alert("Please Enter Confirm Password!")
    }
    else if(password.length < 6 || cpassword.length < 6){
      return alert("Password Must be 6 Characters!");
    }
    else if(password !== cpassword){
      return alert("Password Not Matched!");
    }
    else{
// console.log("User Registered!");
//? Implementation for posting the Data start
const data =await fetch("http://localhost:8009/register",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
  },
  body: JSON.stringify({
    name,email,password,cpassword
  }),

})
const postdata= await data.json();
console.log("postdata",postdata);
if(postdata.status === 201){
  alert("User Sucessfully Registered!")
  setInputValues({
    ...InputValue,
    name: "",
    email: "",
    password: "",
    cpassword: "",
  })

}
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                onChange={setValues}
                value={InputValue.name}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                onChange={setValues}
                value={InputValue.email}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setValues}
                  value={InputValue.password}
                  placeholder="Enter Password"
                  name="password"
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
                  value={InputValue.cpassword}
                  placeholder="Confirm Password"
                  name="cpassword"
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
