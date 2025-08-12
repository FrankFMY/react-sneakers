import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';

import styles from './Card.module.scss';

import { formatCurrency } from '../../utils/formatCurrency';

function Card({
    id,
    title,
    imageUrl,
    price,
    onFavorite,
    onPlus,
    favorited = false,
    loading = false,
}) {
    const { isItemAdded, favorites, cartItems, onAddToCart } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(
        favorited || favorites?.some((item) => Number(item.id) === Number(id))
    );
    const obj = { id, parentId: id, title, imageUrl, price };

    const { updateCartItemQuantity, getCartItemQuantity } =
        React.useContext(AppContext);
    const [quantity, setQuantity] = React.useState(1);
    const itemInCart = isItemAdded(id);
    const itemQuantity = getCartItemQuantity(id);

    // This function is ONLY for the green checkmark/plus button
    const onClickPlus = () => {
        if (itemInCart) {
            // If already in cart, ALWAYS remove ALL of this item when clicking the green checkmark
            // Remove all items at once by setting quantity to 0
            onAddToCart({ ...obj, parentId: id }, 0);
        } else {
            // Add to cart with selected quantity
            onAddToCart(obj, quantity);
            setQuantity(1); // Reset quantity after adding
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    // This function is ONLY for the "+" button next to the quantity
    const handleIncreaseQuantity = () => {
        if (itemInCart) {
            const cartItem = cartItems.find(
                (item) => Number(item.parentId || item.id) === Number(id)
            );
            if (cartItem) {
                updateCartItemQuantity(cartItem.id, 1);
            }
        } else {
            // If not in cart yet, add it with quantity 1
            onAddToCart(obj, 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (itemInCart) {
            updateCartItemQuantity(
                cartItems.find(
                    (item) => Number(item.parentId || item.id) === Number(id)
                ).id,
                -1
            );
        }
    };

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={`${styles.card} ${itemInCart ? styles.inCart : ''}`}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox='0 0 155 265'
                    backgroundColor='#f3f3f3'
                    foregroundColor='#ecebeb'
                >
                    <rect
                        x='1'
                        y='0'
                        rx='10'
                        ry='10'
                        width='155'
                        height='155'
                    />
                    <rect
                        x='0'
                        y='167'
                        rx='5'
                        ry='5'
                        width='155'
                        height='15'
                    />
                    <rect
                        x='0'
                        y='187'
                        rx='5'
                        ry='5'
                        width='100'
                        height='15'
                    />
                    <rect
                        x='1'
                        y='234'
                        rx='5'
                        ry='5'
                        width='80'
                        height='25'
                    />
                    <rect
                        x='124'
                        y='230'
                        rx='10'
                        ry='10'
                        width='32'
                        height='32'
                    />
                </ContentLoader>
            ) : (
                <>
                    {onFavorite && (
                        <div
                            className={styles.favorite}
                            onClick={onClickFavorite}
                        >
                            <img
                                src={
                                    isFavorite
                                        ? 'img/liked.svg'
                                        : 'img/unliked.svg'
                                }
                                alt='Unliked'
                            />
                        </div>
                    )}
                    <img
                        width='100%'
                        height={135}
                        src={imageUrl}
                        alt='Sneakers'
                    />
                    <h5>{title}</h5>
                    <div className='d-flex justify-between align-center'>
                        <div className='d-flex flex-column'>
                            <span>Цена:</span>
                            <b>{formatCurrency(price)}</b>
                        </div>
                        {onPlus && (
                            <div className='d-flex flex-column align-end'>
                                {!itemInCart ? (
                                    <div className='d-flex align-center mb-10'>
                                        <input
                                            type='number'
                                            min='1'
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            style={{
                                                width: '40px',
                                                marginRight: '5px',
                                                textAlign: 'center',
                                                border: '1px solid #f3f3f3',
                                                borderRadius: '5px',
                                                padding: '2px',
                                            }}
                                        />
                                        <span>шт.</span>
                                    </div>
                                ) : (
                                    <div className='d-flex align-center mb-10'>
                                        <button
                                            onClick={handleDecreaseQuantity}
                                            style={{
                                                width: '25px',
                                                height: '25px',
                                                background: '#f8f8f8',
                                                border: '1px solid #eee',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                marginRight: '5px',
                                            }}
                                            title="Уменьшить количество"
                                        >
                                            -
                                        </button>
                                        <span style={{ margin: '0 5px' }}>
                                            {itemQuantity}
                                        </span>
                                        <button
                                            onClick={handleIncreaseQuantity}
                                            style={{
                                                width: '25px',
                                                height: '25px',
                                                background: '#f8f8f8',
                                                border: '1px solid #eee',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                marginLeft: '5px',
                                            }}
                                            title="Увеличить количество"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                                <img
                                    className={styles.plus}
                                    onClick={onClickPlus}
                                    src={
                                        itemInCart
                                            ? 'img/btn-checked.svg'
                                            : 'img/btn-plus.svg'
                                    }
                                    alt={itemInCart ? 'Remove' : 'Add'}
                                    title={itemInCart ? 'Удалить из корзины' : 'Добавить в корзину'}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
