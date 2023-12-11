import { FC } from "react";
import { Link } from "react-router-dom";

const Navigation:FC = () => {
  return (
  <nav className="m-10 flex justify-between items-center h-{50px} px-5  bg-gray-500 text-white">
    <h3 className="font-bold">goods</h3>
    <span className="flex justify-between items-center">
      <Link className="mr-8 my-2 text-3xl" to='/'>Все товары</Link>
      <Link className="mr-2 my-2 text-3xl" to='/favorite'>Корзина </Link>
      <p className="mr-5 font-bold">1</p>
    </span>
  </nav>
  )
}

export default Navigation;
