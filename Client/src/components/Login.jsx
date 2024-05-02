import React, { useState } from "react";
import "./mix.css";
import { useNavigate } from "react-router-dom";

const Login =  () => {
  const navigate = useNavigate()
  const [passShow, setPassShow] = useState(false);

  const [InputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const setValues = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setInputValues(() => {
      return {
        ...InputValues,
        [name]: value,
      };
    });
  };
  console.log(InputValues);

 const loginUser = async(e) => {
  e.preventDefault();

  const { email, password } = InputValues;

  if(email === "") {
    alert("Please Enter your Email");
  }
  else if(password === "") {
    alert("Please Enter Password");
  }
  else{
    const response = await fetch("https://mern-full-authentication-server.vercel.app/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const postdata = await response.json();
    console.log("postdata", postdata);
    if(postdata.status === 201){
      console.log("User Successfully Logged In!")
      localStorage.setItem("usersDataToken",postdata.result.Storedtoken)
      navigate("/dash")
      setInputValues({
        ...InputValues,
        email: "",
        password: "",
      })
    }
  }
}


  return (
    
    <section>
      <>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={InputValues.email}
                onChange={setValues}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={InputValues.password}
                  onChange={setValues}
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
            <button className="btn" onClick={loginUser}>Login</button>
            <p>
              Don't have an Account? <a href="/register">Sign up</a>
            </p>
          </form>
        </div>
      </>
    </section>
  );
};

export default Login;
