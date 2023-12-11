import {FC,  useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import Navigation from "./Navigation"
import HomePage from "../pages/HomePage"
import Favorite from "../pages/Favorite"
//import { getSizes, getSize, getProducts, getProduct, getProductColor, Size, Color, Product } from '../../utils/api'



const App:FC =() => {

  return (
    <main className="bg-slate-200 h-screen">
      <h2 className="pt-20 text-5xl text-center font-bold">E-commerce</h2>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </main>
  )
}

export default App
