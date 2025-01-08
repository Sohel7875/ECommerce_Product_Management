import React, { useContext, useEffect, useState } from 'react';
import productContext from '../context/ProductContext';
import styles from './CartStyle.module.css';
import data from '../data/data';

const Cart = () => {
    const { products, setProducts } = useContext(productContext);
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');

    const getData = () => {
        setCartData(products);
        const price = products.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(price);
    };

    useEffect(() => {
        getData();
    }, [products]);

    const updateQuantity = (id, delta) => {
        setProducts((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    const newQuantity = item.quantity + delta;
                    if (newQuantity < 1 || newQuantity > 10) {
                        setError(newQuantity < 1 ? 'Cannot have less than 1 item' : 'Cannot add more than 10 items');
                        return item;
                    }
                    setError('');
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const handleRemoveItem = (id) => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className={styles.cart}>
            <div className={styles?.cartsItems}>
                {cartData?.length > 0 ? (
                    <div className={styles.items}>
                        {cartData?.map((item, index) => (
                            <div className={styles.productCard} key={index}>
                                <img src={item?.productImage} alt={item?.productName} />
                                <h3>{item?.productName}</h3>
                                <p>{item?.productDescription}</p>
                                <span>${item?.price}</span>
                                <div className={styles?.quantityController}>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    {item?.quantity}
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                </div>
                                <button onClick={() => handleRemoveItem(item?.id)}>Remove Item</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Cart is Empty! Please Add Items</p>
                )}
            </div>

            {products?.length > 0 && <div className={styles.checkOut}>{totalPrice} is The Total Price</div>}

            {error?.length > 0 && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Cart;