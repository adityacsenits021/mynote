import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
    const [credential, setcredential] = useState({name:"", email:"", password:"", confirmpassword:""})
    let history=useHistory();
    const onChange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost/api/auth/createuser", {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({name:credential.name, email:credential.email, password:credential.password }),
          });
          const json=await response.json();
          if(json.success){
              //Save the auth-token and redirect to the note page
              localStorage.setItem('token',json.authtoken);
              props.showAlert("Account created successfully","success");
              history.push("/"); 
          }
          else{
              props.showAlert("Invalid Credentials","danger");
          }
          console.log({json});
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailhelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            name="confirmpassword"
            onChange={onChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
