import { useContext, useEffect, useState } from "react";
import productContext from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import styles from "./PagesStyles.module.css";

const Homepage = () => {
    const navigate = useNavigate();
    const { products, setProducts } = useContext(productContext);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddToCart = (product) => {
        const productExists = products?.find((p) => p.id === product.id);
        if (!productExists) {
            setProducts((prev) => [{ ...product, quantity: 1 }, ...prev]);
        }
    };

    const fetchEcommerceData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://fakestoreapi.com/products");
            if (res.status === 200) {
                setProductData(res?.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEcommerceData();
    }, []);

    return (
        <div className={styles.HomePage}>
            <header className={styles.Header}>
                <h1 onClick={() => navigate("/")}>E-Shop</h1>
                <div className={styles.Cart} onClick={() => navigate("/cart")}>
                    <FaShoppingCart size={24} />
                    <span>{products?.length}</span>
                </div>
            </header>

            {loading ? (
                <div className={styles.SkeletonContainer}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div className={styles.SkeletonCard} key={index}>
                            <div className={styles.SkeletonImage}></div>
                            <div className={styles.SkeletonText}></div>
                            <div className={styles.SkeletonButton}></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.ProductsContainer}>
                    {productData?.map((product, index) => {
                        const isAddedToCart = products?.some((p) => p.id === product.id);
                        return (
                            <div className={styles.ProductCard} key={index}>
                                <img src={product.image} alt={product.title} />
                                <div className={styles.ProductDetails}>
                                    <h3>{product.title}</h3>
                                    <p className={styles.Price}>${product.price}</p>
                                    <div className={styles.Rating}>
                                        <FaStar color="#FFC107" />
                                        <span>{product.rating?.rate}</span>
                                        <span>({product.rating?.count})</span>
                                    </div>
                                </div>
                                <button
                                    className={
                                        isAddedToCart
                                            ? styles.AddedToCartButton
                                            : styles.AddToCartButton
                                    }
                                    onClick={() => handleAddToCart(product)}
                                >
                                    {isAddedToCart ? "In Cart" : "Add to Cart"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Homepage;
