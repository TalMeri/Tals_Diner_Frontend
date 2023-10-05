import "./Headers.css";
import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout as userLogout } from "../../services/user";
import { logout } from "../../app/userSlice";
import { useNavigate } from "react-router-dom";
import Cart from "../cartComponents/Cart/Cart";
import Modal from "../sharedComponents/Modal/Modal";
import { FaShoppingCart } from "react-icons/fa";
import {MdFastfood} from "react-icons/md";
import { updateOrderInit } from "../../app/orderSlice";


const Headers = () => {
  const username = useSelector((state) => state.reduser.username);
  const amount = useSelector((state) => state.cartReducer.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayModal, setDisplayModal] = useState(false);
  const navigateHome = useCallback(
    () => navigate("/", { replace: true }),
    [navigate]
  );
  const navigateMenu = useCallback(
    () => navigate("/menu", { replace: true }),
    [navigate]
  );
  const navigateSignup = useCallback(
    () => navigate("/signup", { replace: true }),
    [navigate]
  );
  const navigateLogin = useCallback(
    () => navigate("/login", { replace: true }),
    [navigate]
  );

  const handleUserLogout = async () => {
    try {
      userLogout();
      dispatch(logout());
      navigateHome();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    dispatch(updateOrderInit({orderInit:false}))
    setDisplayModal(false)
  };

  return (
    <div className="headers">
      <div className="headerscontanierLeft">
      <MdFastfood className="logo"/>
        <h1 className="headersTitle">Tal's Diner</h1>
        {username ? <h2 className="headersName">Hi {username}!</h2> : <></>}
      </div>
      <div className="headerscontanierRight">
        {username ? (
          <>
              <div className="menuLink" onClick={navigateMenu}>
                Menu
              </div>
              <div
                className="cartcontanier"
                onClick={() => setDisplayModal(true)}
              >
                <div className="amountcart">{amount}</div>
                <div>
                  <FaShoppingCart className="cart-icon" />
                </div>
              </div>
              <div className="logout" onClick={handleUserLogout}>
                Logout
              </div>

            <Modal
              content={<Cart />}
              displaym={displayModal}
              closeModal={handleCloseModal}
              setDisplay={setDisplayModal}
            />
          </>
        ) : (
          <>
          <div className="signupLink" onClick={navigateSignup}>SignUp</div>
          <div className="loginLink" onClick={navigateLogin}>Login</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Headers;
