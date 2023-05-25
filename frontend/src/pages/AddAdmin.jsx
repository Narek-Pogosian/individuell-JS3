import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAdmin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:7000/newadmin", { email });

      if (res.status === 201) {
        navigate("/login");
        toast.success("Your now a Admin");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-2xl font-bold">Ecommerce CMS</h1>
      <form onSubmit={handleSubmit} className="w-72" role="form">
        <input
          type="text"
          placeholder="Email"
          className="mb-4 input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-2 mb-4 font-semibold text-white uppercase bg-indigo-500 rounded"
        >
          Add Admin
        </button>
        {error && (
          <p className="font-semibold text-center text-red-500">{error}</p>
        )}
      </form>
    </div>
  );
};

export default AddAdmin;
