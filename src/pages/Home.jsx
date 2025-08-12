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
    const filteredItems = React.useMemo(() => {
        const q = (searchValue || '').toLowerCase();
        return items.filter((item) => item.title.toLowerCase().includes(q));
    }, [items, searchValue]);

    const sortedItems = React.useMemo(() => {
        return [...filteredItems].sort((a, b) => {
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
    }, [filteredItems, cartItems]);

    const renderItems = () => {
        if (isLoading) {
            return [...Array(8)].map((_, index) => (
                <Card key={index} loading={true} />
            ));
        }

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
                    <img src='img/search.svg' alt='Search' />
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