import { FC, useEffect, useState } from "react";
import { getProducts, Product } from '../utils/api';

import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";



const HomePage: FC = () => {

  const [allProducts, setAllProducts] = useState <Product[]>([])

  useEffect(() => {
      getProducts()
        .then((products: Product[]) =>{
          setAllProducts(products)
        });
    }, []);

  return (
    <>
      {/* <Navigation /> */}
      <h2 className="ml-2 md:ml-20 text-1xl text-2xl md:text-3xl underline">Все товары</h2>

      <div className="m-8 flex flex-wrap justify-center ">
      {allProducts.map((product: Product) => (
        <Link
          key={product.id}
          className="m-10 w-282 flex flex-col items-center box-border rounded-10 overflow-hidden bg-gray-100 cursor-pointer shadow-md hover:shadow-2xl"
          to={`/e-commmerce_SPA/product/${product.id}`}
        >
          {product.colors.length > 0 && (
            <div className="">
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
