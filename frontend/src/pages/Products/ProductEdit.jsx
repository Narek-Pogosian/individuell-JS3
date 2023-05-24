import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";

const ProductEdit = () => {
  // We get product info from Link state
  const { state } = useLocation();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: state.product.name,
    category: state.product.category,
    price: state.product.price,
    description: state.product.description,
    image: state.product.image,
  });

  const handleChange = (e) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:7000/api/products/${state.product._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status === 200) {
        navigate(`/products/${state.product._id}`);
      }
    } catch (error) {
      toast.error("Product update failed");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <form className="grid w-4/5 grid-cols-2 gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              defaultValue={formData.name}
              id="name"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 font-semibold text-gray-800"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              className="input"
              defaultValue={formData.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 font-semibold text-gray-800"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              className="input"
              defaultValue={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 font-semibold text-gray-800"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              className="input"
              defaultValue={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <label
              htmlFor="description"
              className="block mb-2 font-semibold text-gray-800"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              className="input"
              rows={6}
              defaultValue={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-6 mt-4">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-4 py-2 font-semibold border-2 rounded text-rose-500 border-rose-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
