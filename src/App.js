import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [darkTheme, setDarkTheme] = React.useState(false);

    React.useEffect(() => {
        // Using mock data since the API is no longer available
        const mockItems = [
            {
                id: '1',
                title: 'Мужские Кроссовки Nike Blazer Mid Suede',
                price: 12999,
                imageUrl: '/img/sneakers/1.jpg',
            },
            {
                id: '2',
                title: 'Мужские Кроссовки Nike Air Max 270',
                price: 15600,
                imageUrl: '/img/sneakers/2.jpg',
            },
            {
                id: '3',
                title: 'Мужские Кроссовки Nike Blazer Mid Suede',
                price: 8499,
                imageUrl: '/img/sneakers/3.jpg',
            },
            {
                id: '4',
                title: 'Кроссовки Puma X Aka Boku Future Rider',
                price: 8999,
                imageUrl: '/img/sneakers/4.jpg',
            },
            {
                id: '5',
                title: 'Мужские Кроссовки Under Armour Curry 8',
                price: 15199,
                imageUrl: '/img/sneakers/5.jpg',
            },
            {
                id: '6',
                title: 'Мужские Кроссовки Nike Kyrie 7',
                price: 11299,
                imageUrl: '/img/sneakers/6.jpg',
            },
            {
                id: '7',
                title: 'Мужские Кроссовки Jordan Air Jordan 11',
                price: 10799,
                imageUrl: '/img/sneakers/7.jpg',
            },
            {
                id: '8',
                title: 'Мужские Кроссовки Nike LeBron XVIII',
                price: 16499,
                imageUrl: '/img/sneakers/8.jpg',
            },
            {
                id: '9',
                title: 'Мужские Кроссовки Nike Lebron XVIII Low',
                price: 13999,
                imageUrl: '/img/sneakers/9.jpg',
            },
            {
                id: '10',
                title: 'Мужские Кроссовки Nike Blazer Mid Suede',
                price: 8499,
                imageUrl: '/img/sneakers/10.jpg',
            },
        ];

        // Try to load cart and favorites from localStorage
        const savedCart = localStorage.getItem('cart');
        const savedFavorites = localStorage.getItem('favorites');

        // Clean up any invalid cart items
        let parsedCart = [];
        if (savedCart) {
            try {
                const tempCart = JSON.parse(savedCart);
                // Filter out any items without required properties
                parsedCart = tempCart.filter(
                    (item) =>
                        item &&
                        item.id &&
                        item.title &&
                        item.price &&
                        !isNaN(item.price)
                );
                // Update localStorage if we filtered anything out
                if (parsedCart.length !== tempCart.length) {
                    localStorage.setItem('cart', JSON.stringify(parsedCart));
                }
            } catch (e) {
                console.error('Error parsing cart data:', e);
                localStorage.removeItem('cart');
            }
        }

        setItems(mockItems);
        setCartItems(parsedCart);
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        setIsLoading(false);
    }, []);

    const onAddToCart = (obj, quantity = 1) => {
        try {
            let newCartItems;

            // If quantity is 0, remove all items with this parentId
            if (quantity === 0) {
                newCartItems = cartItems.filter(
                    (item) =>
                        Number(item.parentId || item.id) !== Number(obj.parentId || obj.id)
                );
            } else {
                const findItem = cartItems.find(
                    (item) =>
                        Number(item.parentId || item.id) === Number(obj.id)
                );

                if (findItem) {
                    // Update quantity if item exists
                    newCartItems = cartItems.map((item) => {
                        if (
                            Number(item.parentId || item.id) === Number(obj.id)
                        ) {
                            return {
                                ...item,
                                quantity: (item.quantity || 1) + quantity,
                            };
                        }
                        return item;
                    });
                } else {
                    // Only add if quantity > 0
                    if (quantity > 0) {
                        // Add new item with quantity
                        const newItem = {
                            ...obj,
                            parentId: obj.id,
                            id: Date.now().toString(),
                            quantity: quantity,
                        };
                        newCartItems = [...cartItems, newItem];
                    } else {
                        newCartItems = [...cartItems];
                    }
                }
            }

            setCartItems(newCartItems);
            localStorage.setItem('cart', JSON.stringify(newCartItems));
        } catch (error) {
            console.error(error);
        }
    };

    const onRemoveItem = (id) => {
        try {
            const newCartItems = cartItems.filter(
                (item) => Number(item.id) !== Number(id)
            );
            setCartItems(newCartItems);
            localStorage.setItem('cart', JSON.stringify(newCartItems));
        } catch (error) {
            console.error(error);
        }
    };

    const updateCartItemQuantity = (id, change) => {
        try {
            const item = cartItems.find(
                (item) => Number(item.id) === Number(id)
            );
            if (!item) return;

            const currentQuantity = item.quantity || 1;
            const newQuantity = currentQuantity + change;

            // If quantity would be less than 1, remove the item
            if (newQuantity < 1) {
                onRemoveItem(id);
                return;
            }

            // Otherwise update the quantity
            const newCartItems = cartItems.map((item) => {
                if (Number(item.id) === Number(id)) {
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }
                return item;
            });

            setCartItems(newCartItems);
            localStorage.setItem('cart', JSON.stringify(newCartItems));
        } catch (error) {
            console.error(error);
        }
    };

    const onAddToFavorite = (obj) => {
        try {
            let newFavorites;

            if (
                favorites.find((favObj) => Number(favObj.id) === Number(obj.id))
            ) {
                newFavorites = favorites.filter(
                    (item) => Number(item.id) !== Number(obj.id)
                );
            } else {
                newFavorites = [...favorites, obj];
            }

            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error(error);
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some(
            (obj) => Number(obj.parentId || obj.id) === Number(id)
        );
    };

    const getCartItemQuantity = (id) => {
        const item = cartItems.find(
            (obj) => Number(obj.parentId || obj.id) === Number(id)
        );
        return item ? item.quantity || 1 : 0;
    };

    // Toggle dark theme
    const toggleTheme = () => {
        const newTheme = !darkTheme;
        setDarkTheme(newTheme);
        localStorage.setItem('darkTheme', JSON.stringify(newTheme));
        
        // Apply theme to body
        if (newTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    };
    
    // Load theme from localStorage on initial render
    React.useEffect(() => {
        const savedTheme = localStorage.getItem('darkTheme');
        if (savedTheme) {
            const isDark = JSON.parse(savedTheme);
            setDarkTheme(isDark);
            if (isDark) {
                document.body.classList.add('dark-theme');
            }
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                getCartItemQuantity,
                onAddToFavorite,
                onAddToCart,
                updateCartItemQuantity,
                setCartOpened,
                setCartItems,
                darkTheme,
                toggleTheme,
            }}
        >
            <div className='wrapper clear'>
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}
                />

                <Header onClickCart={() => setCartOpened(true)} />

                <Routes>
                    <Route
                        path='/'
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route
                        path='/favorites'
                        element={<Favorites />}
                    />
                    <Route
                        path='/orders'
                        element={<Orders />}
                    />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
