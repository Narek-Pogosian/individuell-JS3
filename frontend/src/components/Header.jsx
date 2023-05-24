import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-3 text-white bg-gray-800">
      <div className="container flex items-center gap-10">
        <Link to="/" className="text-xl font-bold">
          Ecommerce CMS
        </Link>
        <nav className="flex gap-4 text-gray-100">
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/products/create">Create</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
