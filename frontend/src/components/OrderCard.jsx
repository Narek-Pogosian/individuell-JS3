import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <Link to={`${order._id}`}>
      <li
        className={`p-4 bg-white shadow border-b-[6px]
        ${order.status === "pending" ? "border-indigo-500" : ""}
        ${order.status === "in transit" ? "border-amber-400" : ""}
        ${order.status === "delivered" ? "border-emerald-500" : ""}
      `}
      >
        <p className="mb-4 text-lg font-semibold">{order.user.email}</p>
        <p className="mb-1 font-semibold">
          Status: <span className="capitalize">{order.status}</span>
        </p>
        <p className="text-gray-600">Products: {order.products.length}</p>
      </li>
    </Link>
  );
};

export default OrderCard;
