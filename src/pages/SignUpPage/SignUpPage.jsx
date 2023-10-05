import React from "react";
import "./SignUpPage.css";
import SignupForm from "../../components/signupComponents/signupForm/SignupForm"

const SignUpPage = () => {
  
  return (
    <div className="signup">
      <h1>SignUp</h1>
      <div className="subTitle">Please sign up to enjoy our yummy menu.</div>
      <SignupForm/>
    </div>
  );
};

export default SignUpPage;
