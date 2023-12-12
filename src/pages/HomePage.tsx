import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSizes, getSize, getProducts, getProduct, getProductColor, Size, Color, Product } from '../utils/api';

import { Link } from "react-router-dom";



const HomePage: FC = () => {

  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState ([])

  useEffect(() => {
      getProducts()
        .then((products: Product) =>{
          setAllProducts(products)
          // console.log(products)
        });
        //getSizes().then((sizes: Size) => console.log("Sizes:", sizes));
        //getSize(1).then((size: Size) => console.log("Size:", size));
        //getProduct(1).then((product: Product) => console.log("Product:", product));
        //getProductColor(1, 1).then((color: Color) => console.log("Product Color:", color));
    }, []);

  return (
    <>

      <h2 className="ml-20 text-3xl underline">Все товары</h2>

      <div className="m-8 flex justify-center min-h-max">
      {allProducts.map((product: Product) => (
        <Link
          key={product.id}
          className="flex flex-col items-center justify-center m-10 bg-gray-100 cursor-pointer shadow-md hover:shadow-2xl"
          to={`/product/${product.id}`}
        >
          {product.colors.length > 0 && (
            <div className="min-h-max">
              <img
                className='w-80 bg-contain '
                src={product.colors[0].images[0]}
                alt={product.colors[0].name}
              />
            </div>
          )}
          <h2 className="my-5 mr-5 xl:text-3xl lg:text-2xl sm:text-xl font-bold text-orange-900">{product.name}</h2>
        </Link>
      ))}
    </div>
    </>
  )
}

export default HomePage
