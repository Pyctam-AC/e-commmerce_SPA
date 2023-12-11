import { FC, useEffect, useState } from "react";
import { getSizes, getSize, getProducts, getProduct, getProductColor, Size, Color, Product } from '../utils/api'

const HomePage: FC = () => {

  const [allProducts, setAllProducts] = useState ([])

  useEffect(() => {
    //  getSizes().then((sizes: Size) => console.log("Sizes:", sizes));
    //  getSize(1).then((size: Size) => console.log("Size:", size));
      getProducts()
        .then((products: Product) =>{
          setAllProducts(products)
          console.log(products)
        });
    //  getProduct(1).then((product: Product) => console.log("Product:", product));
    //  getProductColor(1, 1).then((color: Color) => console.log("Product Color:", color));
    }, []);

  return (
    <>

      <h2 className="ml-20 text-3xl underline">Все товары</h2>

      <div className="m-8 flex justify-center min-h-max">
      {allProducts.map((product: Product) => (
        <div key={product.id}
          className="flex flex-col items-center justify-center m-10 bg-gray-100 cursor-pointer shadow-md hover:shadow-2xl"
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
          <h2 className="my-5 mr-5 text-3xl font-bold text-orange-900">{product.name}</h2>
        </div>
      ))}
    </div>

    </>
  )
}

export default HomePage
