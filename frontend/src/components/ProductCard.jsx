import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <li className="h-full bg-white shadow" title={product.name}>
        <img src={product.image} alt="" />
        <div className="px-2 pt-2 pb-4">
          <h3 className="font-bold truncate">{product.name}</h3>
          <p className="text-gray-500">{product.price}</p>
        </div>
      </li>
    </Link>
  );
};

export default ProductCard;
