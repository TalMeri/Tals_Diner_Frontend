import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Button from "../../sharedComponents/Button/Button";
import { login as loginUser } from "../../../services/user";
import { login } from "../../../app/userSlice";
import { get } from "../../../app/cartSlice";
import { useDispatch } from "react-redux";
import { getCartByUserId } from "../../../services/cart";
import { getItemsInfo } from "../../utils";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [errormessage, setErrormessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateMenu = useCallback(
    () => navigate("/menu", { replace: true }),
    [navigate]);

  const handleSubmit = async () => {
    try {
      if (username !== "" && password !== "") {
        await handleLogin(username, password);
      } else {
        if (username === "") {
          setUsernameEmpty(true);
        }
        if (password === "") {
          setPasswordEmpty(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const res = await loginUser(username, password);
      const resData = res.data.data;
      const userId = resData._id;
      dispatch(
        login({
          username: username,
          userId: userId,
        })
      );
      setUsername("");
      setPassword("");
      await handleGetCart(userId);
      navigateMenu();
    } catch (err) {
      setErrormessage(true);
      console.log(err);
    }
  };

  const handleGetCart = async (userId) => {
    try {
      const res = await getCartByUserId(userId);
      if (res) {
        const resData = res.data.data;
        const items = resData.items;
        const itemsInfo = await getItemsInfo(items);
        dispatch(
          get({
            items: itemsInfo,
            totalPrice: resData.totalPrice,
            totalAmount: resData.totalAmount,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsernameChange = (username) => {
    setErrormessage(false);
    if (username === "") {
      setUsernameEmpty(true);
    } else {
      setUsernameEmpty(false);
    }
    setUsername(username);
  };

  const handlePasswordChange = (password) => {
    setErrormessage(false);
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
          className="loginInput"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
        {usernameEmpty ? (
          <div className="errormessage">Username required.</div>
        ) : (
          <></>
        )}
      </div>
      <div className="row">
        <input
          className="loginInput"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        {passwordEmpty ? (
          <div className="errormessage">Password required.</div>
        ) : (
          <></>
        )}
      </div>
      {errormessage ? (
        <div className="errormessage">
          Username or password are incorrect. Please try again.
        </div>
      ) : (
        <></>
      )}
      <div className="connect"><Button  label={"connect"} onClick={handleSubmit} height={"40px"}/></div>
    </div>
  );
};

export default LoginForm;
