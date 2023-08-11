import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  let history=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch('https://richpanel-backend1.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:loginDetails.email,password:loginDetails.password}),
      });
      const json=await response.json();
      console.log(json);
        if(json.success)
        {
        //   props.showAlert("login Successful","success")
          sessionStorage.setItem('token',json.authtoken)
          console.log(sessionStorage.getItem('token'))
          history("/");
        }
        else{
        //    props.showAlert("Use Correct Credentials","danger")
        console.log("error")
        }
  };
  return (
    <>
      <main>
        <h3>Login to your account</h3>
        <div className="form" onSubmit={handleSubmit}>
          <form action="" className="form-container">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="username@gmail.com"
              name="email"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, email: e.target.value })
              }
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
            <div className="checkbox-container">
              <input type="checkbox" name="checkbox" id="checkbox" />
              Remember Me
            </div>
            <button type="submit" className="submit-btn">
              <h3>Login</h3>
            </button>
          </form>
          <p>
            New to MyApp? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
