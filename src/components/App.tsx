import {FC} from "react";
import { Routes, Route } from "react-router-dom"
import Navigation from "./Navigation"
import HomePage from "../pages/HomePage"
import Favorite from "../pages/Favorite"
import ProductPage from "../pages/ProductPage";
//import { getSizes, getSize, getProducts, getProduct, getProductColor, Size, Color, Product } from '../../utils/api'



const App:FC =() => {


/*   useEffect(() => {
     getSizes().then((sizes: Size) => console.log("Sizes:", sizes));
     getSize(1).then((size: Size) => console.log("Size:", size));
     getProduct(1).then((product: Product) => console.log("Product:", product));
     getProductColor(1, 1).then((color: Color) => console.log("Product Color:", color));
    }, []); */

  return (
    <main className="bg-slate-200 h-screen">
      <h2 className="pt-20 text-5xl text-center font-bold">E-commerce</h2>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </main>
  )
}

export default App
