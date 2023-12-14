import {FC} from "react";
import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Favorite from "../pages/Favorite"
import ProductPage from "../pages/ProductPage";
import Navigation from "./Navigation";

const App:FC =() => {

  return (
    <main className="bg-slate-200 min-h-screen">
      <h1 className="py-5 mx-2 sm:py-10 sm:mx-20 text-2xl md:text-5xl sm:text-3xl font-bold">E-commerce</h1>
      <Navigation />
      <Routes>
        <Route path="/e-commmerce_SPA/" element={<HomePage />} />
        <Route path="/e-commmerce_SPA/product/:id" element={<ProductPage />} />
        <Route path="/e-commmerce_SPA/favorite" element={<Favorite />} />
      </Routes>
    </main>
  )
}

export default App
