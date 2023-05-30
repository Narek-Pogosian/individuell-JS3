import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // There may be orders with products that have been deleted, it will cause error
  if (!product) {
    return <p>Product deletet or error</p>;
  }

  return (
    <Link to={`/products/${product._id || product.id}`}>
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
