import "./CartItem.css";
import React from "react";
import { updateCart } from "../../../services/cart";
import { useSelector, useDispatch } from "react-redux";
import { getItemsInfo } from "../../utils";
import { get } from "../../../app/cartSlice";
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineCloseSquare,
} from "react-icons/ai";

const CartItem = ({ id, price, description, amount }) => {
  const userId = useSelector((state) => state.reduser.userId);
  const dispatch = useDispatch();

  const handleChange = async (delimiter) => {
    const res = await updateCart(userId, id, delimiter);
    const response = res.data.data;
    const itemsInfo = await getItemsInfo(response.items);
    dispatch(
      get({
        totalAmount: response.totalAmount,
        totalPrice: response.totalPrice,
        items: itemsInfo,
      })
    );
  };

  return (
    <div className="itemContanier">
      <div className="itemInfoCart">
        <div className="cartItemDescription">{description}</div>
        <div className="itemPriceContanier">
          ${price} X {amount}
        </div>
      </div>

      <div>
        <div className="itemAmountContanier">
          <AiOutlinePlusSquare
            className="delimiterIcons"
            onClick={() => handleChange(1)}
          />
          {amount === 1 ? (
            <AiOutlineCloseSquare
              className="delimiterIcons"
              onClick={() => handleChange(-1)}
            />
          ) : (
            <AiOutlineMinusSquare
              className="delimiterIcons"
              onClick={() => handleChange(-1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
