/* eslint-disable react-hooks/exhaustive-deps */
import { EventHandler, FC, SyntheticEvent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, Color, Product } from '../utils/api';
import { openPopup } from "../store/popup.slice";
import SizeList from "../components/SizesList";
import Popup from "../components/Popup";
import { RootState } from "../store";
import { addToCart } from '../store/cart.slice';
import Navigation from "../components/Navigation";

const ProductPage: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState<Color[]>([]);
  const [titlePage, setTitlePage] = useState('');
  const [sizeLabels, setSizeLabels] = useState<number[][]>([]);

  const { items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(items));

  }, [items]);

  const {selectedSizes} = useSelector ((state: RootState) => state.sizeSelect)

  const fetchData = async () => {
    if(id !== undefined) {
      const product: Product = await getProduct(parseInt(id.toString()));
      setTitlePage(product.name);
      setAllProducts(product.colors);
      const sizeLabelPromises: Promise<number[][]> = Promise.all(
        product.colors.map(async (color: { sizes: number[] }) => {
          return color.sizes;
        })
      );
      const resolvedSizeLabels = await sizeLabelPromises;
      setSizeLabels(resolvedSizeLabels);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenPopup: EventHandler<SyntheticEvent<HTMLImageElement>> = (event) => {
    const target = event.currentTarget;
    const images = target.getAttribute('data-images');
    if (images) {
      dispatch(openPopup(JSON.parse(images)));
    }
  };

  const handleAddFavorite = (nameProduct: string, colorName: string, photo: string, price: string, selectedSize: string) => {
    dispatch(addToCart({ colorName, sizeName: selectedSize, photo, price, nameProduct }));

  };

  return (
    <>
      <Navigation />
      <h2 className="ml-20 text-3xl underline">{titlePage}</h2>
      <div className="m-8 flex flex-wrap justify-center">
        {allProducts.map((color: Color, colorIndex) => (
          <div key={color.id} className="m-10 w-282 flex flex-col items-center box-border rounded-10 overflow-hidden bg-gray-100 shadow-md rounded">
            <div className="">
              <img
                className="w-80 bg-contain cursor-pointer hover:shadow-2xl"
                src={color.images[0]}
                alt={color.name}
                title="посмотреть"
                data-images={JSON.stringify(color.images)}
                onClick={handleOpenPopup}
                onTouchStart={handleOpenPopup}
              />
            </div>
            <h2 className="mt-3 xl:text-3xl lg:text-2xl sm:text-sm font-bold text-amber-950">
              цвет: {color.name}
            </h2>
            <p className="mt-2 xl:text-xl lg:text-base sm:text-sm">цена: {color.price} </p>
            <p className="my-2">выберете размер:</p>
            {color.sizes.length > 0 ? (
              <div className="flex flex-col items-center">
                <SizeList sizes={sizeLabels[colorIndex]} colorId={color.id} />
                <button
                  className={`mb-2 ${selectedSizes[color.id] ? 'bg-slate-400' : 'bg-gray-300'} rounded-full`}
                  disabled={!selectedSizes[color.id]}
                  onClick={() => {
                    const sizeValue = selectedSizes[color.id];
                    if (sizeValue !== null) {
                      handleAddFavorite(titlePage, color.name, color.images[0], color.price, sizeValue);
                    }
                  }}
                >
                  <p className="py-2 px-3 font-bold xl:text-base lg:text-base sm:text-sm text-black">Добавить в корзину</p>
                </button>
              </div>
            ) : (
              <p className="my-2 font-bold xl:text-base lg:text-base sm:text-sm">нет в наличии</p>
            )}

          </div>
        ))}
      </div>
      <Popup />
    </>
  );
};

export default ProductPage;
