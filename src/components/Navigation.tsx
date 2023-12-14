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
  <nav className="fixed z-10 left-1/2 md:left-1/3 w-90 flex flex-col md:flex-row justify-between md:items-center h-{50px} px-5 bg-gray-500 text-white">
    <h3 className="md:mr-20 font-bold">goods</h3>
    <span className="flex flex-col md:flex-row justify-between items-center">
      <Link className="mr-8 my-1 md:my-2 text-1xl md:text-2xl" to='/e-commmerce_SPA/'>Все товары</Link>
      <Link className="flex md:mr-2 md:my-2 text-1xl md:text-2xl" to='/e-commmerce_SPA/favorite'
        >Ваша корзина&nbsp;
          <p className="mr-1 text-base font-bold">
            {favoriteProductsLength}
          </p>
      </Link>
    </span>
  </nav>
  )
}

export default Navigation;
