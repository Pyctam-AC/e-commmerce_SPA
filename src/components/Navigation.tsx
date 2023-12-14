import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../store/cart.slice";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const Navigation:FC = () => {

  // const dispatch = useDispatch();

  const [favoriteProductsLength, setFavoriteProductsLength] = useState<number>(0);

  const storedSessionDataString = sessionStorage.getItem('cartItems');

  const cartLength = useSelector((state: RootState) => state.cart.length);

  useEffect(() => {
    if (cartLength===0) {
      const parsedData = JSON.parse(storedSessionDataString || '[]') as CartItem[];
      setFavoriteProductsLength(parsedData.length);
    } else {
      setFavoriteProductsLength(cartLength)
    }
  }, [cartLength]);

  return (
  <nav className="m-10 flex flex-col md:flex-row justify-between md:items-center h-{50px} px-5  bg-gray-500 text-white">
    <h3 className="font-bold">goods</h3>
    <span className="flex flex-col md:flex-row justify-between items-center">
      <Link className="mr-8 my-2 text-3xl" to='/e-commmerce_SPA/'>Все товары</Link>
      <Link className="flex mr-2 my-2 text-3xl" to='/favorite'>Корзина&nbsp;<p className="mr-5 text-base font-bold">{favoriteProductsLength}</p></Link>

    </span>
  </nav>
  )
}

export default Navigation;
