import { createContext, useState } from "react";


const productContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])

    return <productContext.Provider value={{ products, setProducts }}>
        {children}
    </productContext.Provider>
}

export default productContext