import React from 'react';
import Card from '../components/Card';

function Home({
    items,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading,
}) {
    const renderItems = () => {
        // Filter items based on search
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (isLoading) {
            return [...Array(8)].map((_, index) => (
                <Card
                    key={index}
                    loading={true}
                />
            ));
        }

        // Sort items to put cart items first
        const sortedItems = [...filteredItems].sort((a, b) => {
            const aInCart = cartItems.some(
                (item) => Number(item.parentId || item.id) === Number(a.id)
            );
            const bInCart = cartItems.some(
                (item) => Number(item.parentId || item.id) === Number(b.id)
            );

            if (aInCart && !bInCart) return -1;
            if (!aInCart && bInCart) return 1;
            return 0;
        });

        return sortedItems.map((item) => (
            <Card
                key={item.id}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj, quantity) => onAddToCart(obj, quantity)}
                loading={false}
                {...item}
            />
        ));
    };

    return (
        <div className='content'>
            <div className='search-content-wrapper'>
                <h1>
                    {searchValue
                        ? `Поиск по запросу: "${searchValue}"`
                        : 'Все кроссовки'}
                </h1>
                <div className='search-block d-flex'>
                    <img
                        src='img/search.svg'
                        alt='Search'
                    />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className='clear cu-p'
                            src='img/btn-remove.svg'
                            alt='Clear'
                        />
                    )}
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder='Поиск...'
                    />
                </div>
            </div>
            <div className='sneakers-grid'>{renderItems()}</div>
        </div>
    );
}

export default Home;