import React, { useContext, useEffect, useState } from 'react';
import productContext from '../context/ProductContext';
import styles from './CartStyles.module.css';

const Cart = () => {
    const { products, setProducts } = useContext(productContext);
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState({
        message:'',
        id:null
    });

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
                        setError(newQuantity < 1 ? {message: 'Cannot have less than 1 item', id:id} 
                             : 
                             {message:  'Cannot add more than 10 items', id:id}
                            );
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
        <div className={styles.cartContainer}>
            <h1 className={styles.cartTitle}>Shopping Cart</h1>

            {cartData.length > 0 ? (
                <>
                    <div className={styles.cartItems}>
                        {cartData.map((item) => (
                            <div className={styles.cartItem} key={item.id}>
                                <img src={item.image} alt={item.title} className={styles.itemImage} />
                                <div className={styles.itemDetails}>
                                    <h2 className={styles.itemTitle}>{item.title}</h2>
                                    <p>{item?.description}</p>
                                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                                    <div className={styles.quantityControl}>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            -
                                        </button>
                                        <span className={styles.quantityValue}>{item.quantity}</span>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                     {error?.message?.length > 0 && error?.id ===item?.id &&  <p className={styles.errorBanner }>{error?.message}</p>}
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.cartSummary}>
                        <h2>Total: ${totalPrice.toFixed(2)}</h2>
                        <button className={styles.checkoutButton}>Proceed to Checkout</button>
                    </div>
                </>
            ) : (
                <p className={styles.emptyMessage}>Your cart is empty. Start shopping now!</p>
            )}
        </div>
    );
};

export default Cart;
