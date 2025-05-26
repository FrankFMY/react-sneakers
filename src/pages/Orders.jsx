import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Orders() {
    const { } = React.useContext(AppContext); // We don't need any context values here
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Mock orders data
    const mockOrders = [
        {
            id: '1',
            items: [
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
            ],
        },
    ];

    // Helper function to load mock orders data
    const loadMockOrders = React.useCallback(() => {
        setOrders(
            mockOrders.reduce((prev, obj) => [...prev, ...obj.items], [])
        );
    }, []);

    React.useEffect(() => {
        // Try to get orders from localStorage first
        const savedOrders = localStorage.getItem('orders');

        if (savedOrders) {
            try {
                const parsedOrders = JSON.parse(savedOrders);
                setOrders(
                    parsedOrders.reduce(
                        (prev, obj) => [...prev, ...obj.items],
                        []
                    )
                );
            } catch (e) {
                console.error('Error parsing saved orders:', e);
                // Fallback to mock data
                loadMockOrders();
            }
        } else {
            loadMockOrders();
        }

        setIsLoading(false);
    }, [loadMockOrders]);

    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>
            </div>

            <div className='d-flex flex-wrap'>
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Orders;
