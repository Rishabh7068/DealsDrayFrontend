import {React , useState , useContext, useEffect} from "react";
import alertContext from "../context/alert/alertContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email ,setEmail] = useState("");
    const [pass ,setPass] = useState("");
    const [name ,setName] = useState("");

    const context = useContext(alertContext);
    const {showAlert} = context;
    const Navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('token')){
        Navigate("/");
      }
    });


    const handleclick= async(e)=>{
        e.preventDefault();

        if(pass.length < 5){
          return showAlert("Invalid Credential","danger");
        }
        
        try {
            const response = await fetch(`${process.env.REACT_APP_server}/api/auth/signup`, {
                method:'POST',
                headers :{
                    'content-Type' : 'application/json'
                },
                body : JSON.stringify({name : name, email : email ,password : pass})
        });
        const json = await response.json();
        console.log(json);
        if(json.authtoken){
            Navigate("/login");
            showAlert("Signup successfull","success");
        }else{
            showAlert(json.error,"danger");
        }
        } catch (error) {
            console.log(error);
        }  
  }
  
  
  return (
    <div className="container my-3">
        <h1>Admin Signup</h1>
      <form>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            UserName address
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Enter UserName"
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
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;