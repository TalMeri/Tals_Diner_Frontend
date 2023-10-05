import "./CartItems.css";
import React from "react";
import { emptyCartForOrder } from "../../../services/cart";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../CartItem/CartItem";
import Button from "../../sharedComponents/Button/Button";
import {ImSad, ImHappy} from "react-icons/im";
import {get} from "../../../app/cartSlice";
import {updateOrderInit} from "../../../app/orderSlice";

const CartItems = () => {
  const userId = useSelector((state) => state.reduser.userId);
  const cartItems = useSelector((state) => state.cartReducer.items);
  const totalAmount = useSelector((state) => state.cartReducer.totalAmount);
  const totalPrice = useSelector((state) => state.cartReducer.totalPrice);
  const orderInit = useSelector((state) => state.orderReducer.orderInit);
  const dispatch = useDispatch()

  const handleOrder = async () => {
    try {
      const res =  await emptyCartForOrder(userId);
      const response = res.data.data;
      dispatch(updateOrderInit({orderInit: true}))
      dispatch(get({items:response.items, totalPrice:response.totalPrice, totalAmount:response.totalAmount}))

    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="cartItems">
      {cartItems.length > 0 ? ( 
        cartItems.map((item) => {
          return (
            <CartItem
              id={item._id}
              description={item.description}
              price={item.price}
              amount={item.amount}
            />
          );
        })
      ) : (
        <></>
      )}
      {cartItems.length > 0 ? ( 
        <>
          <div className="total">
            <div className="CartTotals">
              <div className="totalPrice">Total Price: ${totalPrice}</div>
              <div className="totalAmount">Total Amount: {totalAmount}</div>
            </div>
            <div className="buttonOrder">
              <Button
                label={"order"}
                onClick={handleOrder}
              />
            </div>
          </div>
        </>
      ) : ( orderInit? <div>Yay! We initialized your order. <br/> Your order is on its way <ImHappy className="happyIcon"/></div>:
        <div>Your cart is empty. This is a sad time to all of us <ImSad className="sadIcon"/> <br/> But don't worry you can go back to our menu and add as many items as you want</div>
      )}
    </div>
  );
};

export default CartItems;
