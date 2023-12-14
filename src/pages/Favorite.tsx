import { FC, useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { removeFromCart } from "../store/cart.slice";
import { CartItem } from "../store/cart.slice";
import Navigation from "../components/Navigation";



const Favorite:FC = () => {

  const dispatch = useDispatch();

  const [favoriteProducts, setFavoriteProducts] = useState<CartItem[]>([])

  useEffect(() => {
    const parsedData = JSON.parse(sessionStorage.getItem('cartItems') || '[]') as CartItem[];
    console.log(parsedData)
    setFavoriteProducts(parsedData);
  }, [])

  const updateSessionStorage = (newItems: CartItem[]) => {
    sessionStorage.setItem('cartItems', JSON.stringify(newItems));
  };

  const handleRemoveFromCart = (index: number) => {
    dispatch(removeFromCart(index));
    setFavoriteProducts((prevProducts) => {
      const newProducts = prevProducts.filter((_, i) => i !== index);
      updateSessionStorage(newProducts);
      return newProducts;
    });
  };

  return (
    <>
      <Navigation />
      <h2 className="ml-20 text-3xl underline">Ваша корзина</h2>
      <div className="m-8 flex flex-wrap justify-center">

          {favoriteProducts.length===0 && <h2 className="mt-3 xl:text-3xl lg:text-2xl sm:text-sm font-bold text-amber-950">
                товаров в корзине нет
              </h2>}

           {favoriteProducts.map((color: CartItem, colorIndex) => (
            <div key={colorIndex} className="m-10 w-282 flex flex-col items-center box-border rounded-10 overflow-hidden bg-gray-100 shadow-md rounded">
              <div className="min-h-max">
                <img
                  className="w-80 bg-contain cursor-pointer hover:shadow-2xl"
                  src={color.photo}
                  alt={color.nameProduct}
                  title="фото товара"
                />
              </div>
              <h2 className="mt-3 xl:text-3xl lg:text-2xl sm:text-sm font-bold text-amber-950">
                {color.nameProduct}
              </h2>
              <p className="mt-2 xl:text-xl lg:text-base sm:text-sm">цвет: {color.colorName}</p>
              <p className="mt-2 xl:text-xl lg:text-base sm:text-sm">размер: {color.sizeName} </p>
              <p className="mt-2 xl:text-xl lg:text-base sm:text-sm">цена: {color.price} </p>
              <button
                className="mb-2 bg-slate-400 rounded-full"
                onClick={() => handleRemoveFromCart(colorIndex)}>
                <p className="py-2 px-3 font-bold xl:text-base lg:text-base sm:text-sm text-black">Удалить из корзины</p>
              </button>
            </div>
          ))}
      </div>
    </>
  )
}

export default Favorite
