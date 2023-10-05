import React, { useState, useCallback } from "react";
import "./SignupForm.css";
import Button from "../../sharedComponents/Button/Button";
import { createUser } from "../../../services/user";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [usernameExist, setUsernameExist] = useState(false);
  const navigate = useNavigate();
  const navigateLogin = useCallback(
    () => navigate("/login", { replace: true }),
    [navigate]
  );

  const handleSubmit = () => {
    if (username !== "" && password !== "") {
      createUser(username, password)
        .then((res) => {
          setUsername("");
          setPassword("");
          navigateLogin();
        })
        .catch((error) => setUsernameExist(true));
    } else {
      if (username === "") {
        setUsernameEmpty(true);
      }
      if (password === "") {
        setPasswordEmpty(true);
      }
    }
  };

  const handleUsernameChange = (username) => {
    setUsernameExist(false)
    if (username === "") {
      setUsernameEmpty(true);
      
    } else {
      setUsernameEmpty(false);
    }
    setUsername(username);
  };

  const handlePasswordChange = (password) => {
    setUsernameExist(false)
    if (password === "") {
      setPasswordEmpty(true);
    } else {
      setPasswordEmpty(false);
    }
    setPassword(password);
  };

  return (
    <div className="form">
      <div className="row">
        <input
          className="signupInput"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
        {usernameEmpty ? (
          <div className="errormessage">Username required.</div>
        ) : (
          <div className="errormessageSpace"></div>
        )}
      </div>
      <div className="row">
        <input
          className="signupInput"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        {passwordEmpty ? (
          <div className="errormessage">Password required.</div>
        ) : (
          <div className="errormessageSpace"></div>
        )}
      </div>
      {usernameExist ? (
        <div className="errormessage">
          Username already taken. Please choose another name.
        </div>
      ) : (
        <div className="errormessageSpace"></div>
      )}
      <div className="signupButton">
        <Button label={"Sign Up"} onClick={handleSubmit} height={"40px"} />
      </div>
    </div>
  );
};

export default SignupForm;
