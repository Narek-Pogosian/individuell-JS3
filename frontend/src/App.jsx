import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Products from "./pages/Products/Products";
import { useAuthContext } from "./hooks/useAuthContext";
import ProductDetails from "./pages/Products/ProductDetails";
import ProductEdit from "./pages/Products/ProductEdit";
import Create from "./pages/Products/Create";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAdmin from "./pages/AddAdmin";

const App = () => {
  const { user } = useAuthContext();

  console.log(user);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/addadmin" element={<AddAdmin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="products/create" element={<Create />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </>
  );
};

export default App;
