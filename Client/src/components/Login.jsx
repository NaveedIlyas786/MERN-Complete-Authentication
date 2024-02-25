import React, { useState } from "react";
import "./mix.css";

const Login = () => {
  const [passShow,setPassShow]=useState(false);

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
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!passShow ?"password":"text"} placeholder="Enter Password" name="password" id="password" />
                <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn">Login</button>
            <p>Don't have an Account? <a href="/register">Sign up</a></p>
          </form>
        </div>
      </>
    </section>
  );
};

export default Login;