import {FC} from "react";
import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Favorite from "../pages/Favorite"
import ProductPage from "../pages/ProductPage";

const App:FC =() => {

  return (
    <main className="bg-slate-200 min-h-screen">
      <h2 className="pt-10 mx-10 text-3xl sm:text-5xl font-bold">E-commerce</h2>

      <Routes>
        <Route path="/e-commmerce_SPA/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </main>
  )
}

export default App
