import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    const [userDetails, setuserDetails] = useState({
        name: "",
        email: "",
        password: "",
      });
      let history=useNavigate()
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userDetails);

        const response = await fetch('https://richpanel-backend1.onrender.com/api/auth/signup', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:userDetails.name,email:userDetails.email,password:userDetails.password}),
          });
          const json=await response.json();
          console.log(json);
          if(json.success)
          {
            // props.showAlert("Signup successful","success")
            sessionStorage.setItem('token',json.authtoken)
            console.log(sessionStorage.getItem('token'));
              history("/");
          }
          else{
            // props.showAlert("Signup failed user already exists","danger")
          }
      
      };
      return (
        <>
          <main>
            <h3>Create Account</h3>
            <form action="" className="form-container" onSubmit={handleSubmit}>
              <label htmlFor="text" className="form-label">
                Name
              </label>
              <input
                type="name"
                name="name"
                required
                className="form-control"
                placeholder="Username"
                value={userDetails.name}
                onChange={(e) =>
                  setuserDetails({ ...userDetails, name: e.target.value })
                }
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="form-control"
                placeholder="username@gmail.com"
                value={userDetails.email}
                onChange={(e) =>
                  setuserDetails({ ...userDetails, email: e.target.value })
                }
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                name="password"
                value={userDetails.password}
                onChange={(e) =>
                  setuserDetails({ ...userDetails, password: e.target.value })
                }
              />
              <div className="checkbox-container">
                <input type="checkbox" name="checkbox" id="checkbox" />
                Remember Me
              </div>
              <button type="submit" className="submit-btn">
                <h3>Sign Up</h3>
              </button>
            </form>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </main>
        </>
      );
}

export default Signup