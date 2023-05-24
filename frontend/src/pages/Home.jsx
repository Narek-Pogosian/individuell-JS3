import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-20 text-3xl font-bold text-slate-800">
        Welcome to Ecommerce CMS
      </h1>
      <div className="flex flex-col gap-6 text-center w-52">
        <Link
          to="products/create"
          className="px-4 py-2 font-semibold text-white rounded shadow bg-slate-500"
        >
          Create a Product
        </Link>
        <Link
          to="products"
          className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded shadow"
        >
          View All Products
        </Link>
        <Link
          to="orders"
          className="px-4 py-2 font-semibold text-white rounded shadow bg-emerald-500"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default Home;
