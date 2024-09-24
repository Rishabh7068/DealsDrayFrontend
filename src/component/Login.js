import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const context = useContext(alertContext);
  const { showAlert } = context;
  const Navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      Navigate("/home");
    }
  });

  const handleclick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_server}/api/auth/login`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: pass }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token',json.authtoken);
        localStorage.setItem('name',json.name);
        showAlert("Login successfull", "success");
        Navigate("/home");
      } else {
        showAlert("Login failed - Login with correct credential", "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-3">
        <h1>Admin Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;