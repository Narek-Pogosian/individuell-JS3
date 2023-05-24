import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:7000/login", {
        email,
        password,
      });

      const { token } = res.data;

      setUser({ token, user: jwt_decode(token) });
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-2xl font-bold">Ecommerce CMS</h1>
      <form onSubmit={handleLogin} className="w-72">
        <input
          type="text"
          placeholder="Email"
          className="mb-4 input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 mb-4 font-semibold text-white uppercase bg-indigo-500 rounded"
        >
          Log In
        </button>
        {error && (
          <p className="font-semibold text-center text-red-500">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
