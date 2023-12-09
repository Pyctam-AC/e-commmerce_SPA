import { Routes, Route } from "react-router-dom"
import Navigation from "./Navigation"
import HomePage from "../../pages/HomePage"
import Favorite from "../../pages/Favorite"


const App =() => {

  return (
    <>
      <h2 className="my-10 text-3xl text-center font-bold">E-commerce</h2>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </>
  )
}

export default App
