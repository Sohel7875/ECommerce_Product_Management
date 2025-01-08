import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./page/Homepage"
import Cart from "./page/Cart"
const App = () => {
  return (
  
    <Router>
      <Routes>
        <Route index path="/" element ={<Homepage />} />
        <Route  path="/cart" element ={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App