import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import ThemeSwitch from './ThemeSwitch';

import { formatCurrency } from '../utils/formatCurrency';

function Header(props) {
    const { totalPrice } = useCart();
    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className='d-flex justify-between align-center'>
            <div className="headerLeft">
                <Link to='/'>
                    <div className='d-flex align-center'>
                        <img
                            width={isMobile ? 30 : 40}
                            height={isMobile ? 30 : 40}
                            src='img/logo.png'
                            alt='Logotype'
                        />
                        <div>
                            <h3 className='text-uppercase'>{isMobile ? 'RS' : 'React Sneakers'}</h3>
                            {!isMobile && <p className='opacity-5'>Магазин лучших кроссовок</p>}
                        </div>
                    </div>
                </Link>
            </div>
            <ul className='d-flex align-center headerRight'>
                <li className='mr-30 cu-p'>
                    <ThemeSwitch />
                </li>
                <li
                    onClick={props.onClickCart}
                    className='mr-30 cu-p'
                >
                    <img
                        width={18}
                        height={18}
                        src='img/cart.svg'
                        alt='Корзина'
                    />
                    <span>{formatCurrency(totalPrice)}</span>
                </li>
                <li className='mr-20 cu-p'>
                    <Link to='/favorites'>
                        <img
                            width={18}
                            height={18}
                            src='img/heart.svg'
                            alt='Закладки'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/orders'>
                        <img
                            width={18}
                            height={18}
                            src='img/user.svg'
                            alt='Пользователь'
                        />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;