import React from "react";
import "./LoginPage.css";
import LoginForm from "../../components/loginComponents/LoginForm/LoginForm";

const LoginPage = () => {
  
  return (
    <div className="login">
      <h1>Login</h1>
      <div className="subTitle">Final step and you are there!</div>
      <LoginForm/>
    </div>
  );
};

export default LoginPage;