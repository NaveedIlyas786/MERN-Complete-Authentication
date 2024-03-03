import React, { useState } from "react";
import "./mix.css";

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [InputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const setValues = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setInputValue(() => {
      return {
        ...InputValue,
        [name]: value,
      };
    });
  };
  console.log(InputValue);

  const loginUser = (e) => {
    e.preventDefault();

    if(InputValue.email === "") {
alert("PLease Enter your Email");
}
else if(InputValue.password === "") {
      alert("PLease Enter Password");

    }
    else{
      console.log("Loged In !");
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
                value={InputValue.email}
                onChange={setValues}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={InputValue.password}
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
