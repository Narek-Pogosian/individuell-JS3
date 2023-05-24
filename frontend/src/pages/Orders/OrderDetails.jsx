import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProductCard from "../../components/ProductCard";
import { toast } from "react-toastify";

const selectOptions = [
  { id: 0, value: "pending", name: "Pending" },
  { id: 1, value: "in transit", name: "In Transit" },
  { id: 2, value: "delivered", name: "Delivered" },
];

const OrderDetails = () => {
  const [order, setOrder] = useState();
  const [selectedStatus, setSelectedStatus] = useState();

  const { user } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(`http://localhost:7000/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrder(res.data);
      setSelectedStatus(res.data.status);
    };

    fetchOrder();
  }, [id, user.token]);

  const updateStatus = async (e) => {
    e.preventDefault();
    if (selectedStatus === order?.status) return;

    try {
      const res = await axios.patch(
        `http://localhost:7000/orders/${id}`,
        {
          status: selectedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status === 200) {
        setOrder(res.data);
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.error("Error updating order");
    }
  };

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Order Details</h1>
      <div className="flex flex-col gap-2 mb-10">
        <p>
          <b>Order Id:</b> {order?._id}
        </p>
        <p>
          <b>User:</b> {order?.user.email}
        </p>

        <p className="mb-1 capitalize">
          <b>Status:</b> {order?.status}
        </p>
        <form onSubmit={updateStatus}>
          <select
            name="status"
            id="status"
            className="mr-4 input w-80"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {selectOptions.map((option) => (
              <option
                className="w-full"
                key={option.id}
                value={option.value}
                selected={option.value === selectedStatus}
              >
                {option.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={selectedStatus === order?.status}
            className="px-4 py-2 text-white bg-indigo-500 rounded disabled:cursor-not-allowed disabled:opacity-50"
          >
            Update
          </button>
        </form>
      </div>
      <div>
        <p className="mb-2 text-lg font-semibold">
          Products: {order?.products.length}
        </p>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {order?.products?.map((product) => (
            <ProductCard key={product._id} product={product.product} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default OrderDetails;
