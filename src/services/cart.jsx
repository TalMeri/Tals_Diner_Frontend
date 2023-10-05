import axios from "axios";

export const updateCart = (userId,nourishmentId,amount) => {
    return axios.put(  `/cart/user/${userId}`,{
        nourishmentId: nourishmentId,
        amount: amount
    });
};

export const getCartByUserId = (userId) => {
    return axios.get(  `/cart/user/${userId}`);
};

export const emptyCartForOrder = (userId) => {
    return axios.put(  `/cart/order/${userId}`);
};