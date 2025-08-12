import React from 'react';
import AppContext from '../context';

export const useCart = () => {
    const { cartItems, setCartItems } = React.useContext(AppContext);

    // Calculate total price safely as a number
    const totalPrice = cartItems.reduce((sum, obj) => {
        const price = Number(obj.price) || 0;
        const quantity = Number(obj.quantity) || 1;
        const itemPrice = price * quantity;
        return itemPrice + sum;
    }, 0);

    return { cartItems, setCartItems, totalPrice };
};
