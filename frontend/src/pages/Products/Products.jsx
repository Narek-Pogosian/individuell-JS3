import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/products");
        setProducts(res.data);
      } catch (error) {
        toast.error("Error getting products");
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }, [filterQuery, products]);

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          name="search"
          placeholder="Search by product name..."
          className="input"
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </>
  );
};

export default Products;
