import React from 'react';
import AppContext from '../context';

export const useCart = () => {
    const { cartItems, setCartItems } = React.useContext(AppContext);

    // Calculate total price safely
    const totalPrice = cartItems.reduce((sum, obj) => {
        // Make sure price is a number and quantity is at least 1
        const price = Number(obj.price) || 0;
        const quantity = Number(obj.quantity) || 1;
        const itemPrice = price * quantity;
        return itemPrice + sum;
    }, 0).toFixed(2);

    return { cartItems, setCartItems, totalPrice };
};
