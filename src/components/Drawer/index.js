import React from 'react';
import Info from '../Info';
import { useCart } from '../../hooks/useCart';
import AppContext from '../../context';
import styles from './Drawer.module.scss';

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const { updateCartItemQuantity } = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = () => {
        setIsLoading(true);
        // Simulate order creation with a mock order ID
        setTimeout(() => {
            const orderId = Math.floor(Math.random() * 1000).toString();

            // Save order to localStorage
            const savedOrders = localStorage.getItem('orders');
            const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];

            const newOrder = {
                id: orderId,
                items: cartItems,
            };

            localStorage.setItem(
                'orders',
                JSON.stringify([...parsedOrders, newOrder])
            );

            setOrderId(orderId);
            setIsOrderComplete(true);
            setCartItems([]);
            setIsLoading(false);
        }, 1000);
    };

    const onOverlayClick = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            onClose();
        }
    };

    return (
        <div
            className={`${styles.overlay} ${
                opened ? styles.overlayVisible : ''
            }`}
            onClick={onOverlayClick}
        >
            <div className={styles.drawer}>
                <h2 className='d-flex justify-between mb-30'>
                    Корзина{' '}
                    <img
                        onClick={onClose}
                        className='cu-p'
                        src='img/btn-remove.svg'
                        alt='Close'
                    />
                </h2>

                {items.length > 0 ? (
                    <div className='d-flex flex-column flex'>
                        <div className='items flex'>
                            {items.map((obj) => (
                                <div
                                    key={obj.id}
                                    className='cartItem d-flex align-center mb-20'
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${obj.imageUrl})`,
                                        }}
                                        className='cartItemImg'
                                    ></div>

                                    <div className='mr-20 flex'>
                                        <p className='mb-5'>{obj.title}</p>
                                        <div className='d-flex align-center'>
                                            <b>{obj.price} руб.</b>
                                            <span className='ml-5'>
                                                × {obj.quantity || 1}
                                            </span>
                                        </div>
                                        <div className='d-flex align-center mt-5'>
                                            <button
                                                className='quantityBtn mr-5'
                                                onClick={() =>
                                                    updateCartItemQuantity(
                                                        obj.id,
                                                        -1
                                                    )
                                                }
                                                style={{
                                                    width: '25px',
                                                    height: '25px',
                                                    background: '#f8f8f8',
                                                    border: '1px solid #eee',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                -
                                            </button>
                                            <button
                                                className='quantityBtn'
                                                onClick={() =>
                                                    updateCartItemQuantity(
                                                        obj.id,
                                                        1
                                                    )
                                                }
                                                style={{
                                                    width: '25px',
                                                    height: '25px',
                                                    background: '#f8f8f8',
                                                    border: '1px solid #eee',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className='removeBtn'
                                        src='img/btn-remove.svg'
                                        alt='Remove'
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='cartTotalBlock'>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб. </b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{((totalPrice / 100) * 5).toFixed(2)} руб. </b>
                                </li>
                            </ul>
                            <button
                                disabled={isLoading}
                                onClick={onClickOrder}
                                className='greenButton'
                            >
                                Оформить заказ{' '}
                                <img
                                    src='img/arrow.svg'
                                    alt='Arrow'
                                />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={
                            isOrderComplete
                                ? 'Заказ оформлен!'
                                : 'Корзина пустая'
                        }
                        description={
                            isOrderComplete
                                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        }
                        image={
                            isOrderComplete
                                ? 'img/complete-order.jpg'
                                : 'img/empty-cart.jpg'
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;
