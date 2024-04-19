import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import React, { useState } from "react";
import { Helmet } from 'react-helmet';

function Register() {
  const [error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    
    try{
      // const res = await axios.post("http://localhost:8800/api/auth/register", {
      const res = await apiRequest.post("/auth/register", {
        username, email, password
      });
      const formattedResponse = res.message;
      console.log(formattedResponse)
      navigate("/login")
    }catch(err){
      console.log(err)
      setError(err.response.data.message)
    }finally{
      setIsLoading(false)
    }
  };



  return (
    <div>
      <Helmet>
        <title>Register Page</title>
        <meta name="description" content="Register Page" />
      </Helmet>
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={IsLoading}>Register</button>
          {error && <span>{error}</span>}

          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  </div>
  );
}

export default Register;


