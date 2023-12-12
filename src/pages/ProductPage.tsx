import { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSizes, getSize, getProducts, getProduct, getProductColor, Size, Color, Product } from '../utils/api';
import { openPopup } from "../store/popup.slice";
import SizeFetcher from "../components/SizesList";
import Popup from "../components/Popup";

const ProductPage: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState<Color[]>([]);
  const [titlePage, setTitlePage] = useState('');
  const [sizeLabels, setSizeLabels] = useState<number[][]>([]);

  const fetchData = async () => {
    const product: Product = await getProduct(id);
    setTitlePage(product.name);
    setAllProducts(product.colors);
    const sizeLabelPromises: Promise<number[][]> = Promise.all(
      product.colors.map(async (color: { sizes: number[] }) => {
        return color.sizes;
      })
    );
    const resolvedSizeLabels = await sizeLabelPromises;
    setSizeLabels(resolvedSizeLabels);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPopup: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (event) => {
    const target = event.currentTarget;
    const images = target.getAttribute('data-images');
    if (images) {
      dispatch(openPopup(JSON.parse(images)));
    }
  };

  return (
    <>
      <h2 className="ml-20 text-3xl underline">{titlePage}</h2>
      <div className="m-8 flex justify-center min-h-max">
        {allProducts.map((color: Color, colorIndex) => (
          <div key={color.id} className="flex flex-col items-center m-10 bg-gray-100 shadow-md">
            <div className="min-h-max">
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
                <SizeFetcher sizes={sizeLabels[colorIndex]} />
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
