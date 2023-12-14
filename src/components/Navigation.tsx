import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../store/cart.slice";
import { addCount } from "../store/cart.slice";
import { RootState } from "../store";


const Navigation:FC = () => {

  const dispatch = useDispatch();

  const [favoriteProductsLength, setFavoriteProductsLength] = useState<number>(0);

  const storedSessionDataString = sessionStorage.getItem('cartItems');

  const cartLength = useSelector((state: RootState) => state.cart.length);

  useEffect(() => {
    if (cartLength===0) {
      const parsedData = JSON.parse(storedSessionDataString || '[]') as CartItem[];
      setFavoriteProductsLength(parsedData.length);
      dispatch(addCount(parsedData.length))
    } else {
      setFavoriteProductsLength(cartLength)
    }
  }, [cartLength]);

  return (
    <nav className="fixed inset-x-0 md:inset-x-auto bottom-2 md:inset-y-auto md:w-1/2 z-10 left-0 md:left-1/3 flex justify-between md:flex-row items-center px-5 bg-gray-500 text-white h-16 opacity-80 md:h-auto md:opacity-100">
      <h3 className="md:mr-8 font-bold">goods</h3>
      <span className="flex  md:flex-row justify-between items-center">
        <Link
          className="mr-12  text-2xl font-bold"
          to="/e-commmerce_SPA/"
        >
          Все товары
        </Link>
        <Link
          className="flex mr-2 text-1xl md:text-2xl "
          to="/e-commmerce_SPA/favorite"
        >
          <img className="w-10 mr-2" src='../images/images.png' />
          <p className="mr-2 text-base font-bold">{favoriteProductsLength}</p>
        </Link>
      </span>
    </nav>
  );
}

export default Navigation;
