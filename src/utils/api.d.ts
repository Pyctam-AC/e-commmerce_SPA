  type Size = {
    id: number;
    label: string;
    number: number;
  };


  type Color = {
    id: number;
    name: string;
    images: string[];
    price: string;
    description: string;
    sizes: number[];
  };


  type Product = {
    id: number;
    name: string;
    colors: Color[];
  };


  function getSizes(): Promise<Size[]>;


  function getSize(id: number): Promise<Size>;


  function getProducts(): Promise<Product[]>;


  function getProduct(id: number): Promise<Product>;


  function getProductColor(productID: number, colorID: number): Promise<Color>;

  export { Size, Color, Product, getSizes, getSize, getProducts, getProduct, getProductColor };

