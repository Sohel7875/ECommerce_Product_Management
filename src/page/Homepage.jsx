import { useContext } from "react";
import data from "../data/data";
import productContext from "../context/ProductContext";
import styles from './PagesStyles.module.css';
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();
    const { products, setProducts } = useContext(productContext);

    const handleAddToCart = (product) => {
        const productExists = products?.find((p) => p.id === product.id);
        if (!productExists) {
            setProducts((prev) => [{ ...product, quantity: 1 }, ...prev]);
        }
    };


    return (
        <div className={styles.HomePage}>
            <div className={styles?.cart}>
                <p
                    className={styles?.cartDes}
                    onClick={() => navigate('/cart')}
                >
                    Items in Cart <span>{products?.length}</span>
                </p>
            </div>
            <div className={styles.ProductsContainer}>
                {data?.length > 0 && data?.map((product, index) => {
                    const isAddedToCart = products?.some((p) => p.id === product.id);

                    return (
                        <div className={styles.productCard} key={index}>
                            <img src={product?.productImage} alt={product?.productName} />
                            <h3>{product?.productName}</h3>
                            <p>{product?.productDescription}</p>
                            <span>${product?.price}</span>
                            <button onClick={() => handleAddToCart(product)}>
                                {isAddedToCart ? 'Added in Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;