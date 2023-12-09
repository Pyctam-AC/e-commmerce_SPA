import { Link } from "react-router-dom";

const Navigation = () => {
  return (
  <nav className="m-10 flex justify-between items-center h-{50px} px-5  bg-gray-500 text-white">
    <h3 className="font-bold">goods</h3>
    <span>
      <Link className="mr-8" to='/'>Home</Link>
      <Link to='/favorite'>Favorite</Link>
    </span>
  </nav>
  )
}

export default Navigation;
