import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../store/cart.slice";
import { addCount } from "../store/cart.slice";
import { RootState } from "../store";

const Basket: FC = () => {
  const dispatch = useDispatch();

  const [favoriteProductsLength, setFavoriteProductsLength] =
    useState<number>(0);

  const storedSessionDataString = sessionStorage.getItem("cartItems");

  const cartLength = useSelector((state: RootState) => state.cart.length);

  useEffect(() => {
    if (cartLength === 0) {
      const parsedData = JSON.parse(
        storedSessionDataString || "[]"
      ) as CartItem[];
      setFavoriteProductsLength(parsedData.length);
      dispatch(addCount(parsedData.length));
    } else {
      setFavoriteProductsLength(cartLength);
    }
  }, [cartLength]);

  return (
    <Link
      className="flex md:mr-2 md:my-2 text-1xl md:text-2xl"
      to="/e-commmerce_SPA/favorite"
    >
      <img src="../../public/images.gng" />
      <p className="mr-1 text-base font-bold">{favoriteProductsLength}</p>
    </Link>
  );
};

export default Basket;
