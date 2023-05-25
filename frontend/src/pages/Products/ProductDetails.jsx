import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const [product, setProduct] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:7000/api/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:7000/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (res.status === 200) {
        navigate("/products");
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      toast.error("Product could not be deleted");
    }
  };

  return (
    <>
      <h1 className="mb-10 text-3xl font-bold">{product?.name}</h1>
      <div className="flex gap-10">
        <div className="flex-shrink-0 shadow w-[450px]">
          <img src={product?.image} alt="" />
        </div>
        <div className="flex flex-col gap-12">
          <div>
            <p className="mb-4 text-lg font-semibold">{product?.category}</p>
            <p className="mb-4 text-gray-600">{product?.description}</p>
            <p className="font-bold">{product?.price}</p>
          </div>
          <div>
            <Link
              to="edit"
              // Sending the product as state instead of having to fetch again
              state={{ product: product }}
              className="px-4 py-2 mr-5 font-semibold text-white bg-indigo-500 rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteProduct(id)}
              className="px-4 py-2 font-semibold text-white rounded bg-rose-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
