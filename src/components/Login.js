import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const Login = (props) => {
    const [credential, setcredential] = useState({email:"", password:""})
    let history=useHistory();
    const handOnChange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost/api/auth/login", {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({ email:credential.email, password:credential.password }),
          });
          const json=await response.json();
          if(json.success){
              //Save the auth-token and redirect to the note page
              localStorage.setItem('token',json.authtoken);
              props.showAlert("Logged in successfully","success")
              history.push("/");
          }
          else{
            props.showAlert("Invalid Details","danger")
          }
          console.log({json});
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={handOnChange}
            value={credential.email}
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={handOnChange}
            value={credential.password}
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
