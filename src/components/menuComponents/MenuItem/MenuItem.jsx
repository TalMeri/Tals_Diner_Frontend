import "./MenuItem.css";
import React, { useState } from "react";
import Button from "../../sharedComponents/Button/Button";
import NumberInput from "../../sharedComponents/NumberInput/NumberInput";
import { updateCart } from "../../../services/cart";
import { useSelector, useDispatch } from "react-redux";
import {get} from "../../../app/cartSlice"
import { getItemsInfo } from "../../utils";

const MenuItem = ({ id, img, price, description }) => {
  const userId = useSelector((state) => state.reduser.userId);
  const dispatch = useDispatch();


  const [amonut, setAmount] = useState(1);
  const handleAddToCart = async (idToAdd, amountToAdd) => {
    if (userId) {
      updateCart(userId, idToAdd, amountToAdd)
        .then( async (res) => {
          const response = res.data.data;
          const itemsInfo = await getItemsInfo(response.items);
          dispatch(get({totalAmount: response.totalAmount, totalPrice:response.totalPrice, items: itemsInfo}))
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="itemContanier">
      <div className="itemInfo">
        <div className="itemImageContanier">
          <img className="itemImage" src={img} />
        </div>
        <div>
          <div className="itemDescription">{description}</div>
          <div className="itemPriceContanier">${price}</div>
        </div>
      </div>
      <div>
        <div className="itemAmountContanier">
          <div className="addToCart"><Button label={"add"} onClick={() => handleAddToCart(id, amonut)} /></div>
          <NumberInput
            min={1}
            max={20}
            placeholder={1}
            value={amonut}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
