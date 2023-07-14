import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import "../Components/syles/Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const  navigate= useNavigate()

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  //Function to set Token in cookies
  function setCookie(name, value, daysToExpire) {
    var cookie = name + '=' + encodeURIComponent(value);
  
    if (daysToExpire) {
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + daysToExpire);
      cookie += '; expires=' + expirationDate.toUTCString();
    }
  
    document.cookie = cookie;
  }

  function loginFetch() {
    const payload = {
      email,
      password
    };

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.msg === "Login success"){
          setCookie("accessToken",data.accessToken,2)
          alert("login successfull")
          navigate("../Product")  
        }
        else{
          alert(data.msg)
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginFetch();
  }

  return (
    <div>
      <form className="login-form " onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
