import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import OrderCard from "../../components/OrderCard";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();
  const [userFilterQuery, setUserFilterQuery] = useState("");

  console.log(user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:7000/orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.status === 200) {
          setOrders(res.data);
        }
      } catch (error) {
        toast.error("Error fetching the orders");
        console.log(error);
      }
    };

    fetchOrders();
  }, [user.token]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.user.email.toLowerCase().includes(userFilterQuery.toLowerCase())
    );
  }, [userFilterQuery, orders]);

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          name="search"
          placeholder="Search by user..."
          className="input"
          onChange={(e) => setUserFilterQuery(e.target.value)}
        />
      </div>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {filteredOrders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </ul>
    </>
  );
};

export default Orders;
