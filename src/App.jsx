/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import ShoppingCart from "./components/ShoppingCart";
import UserUI from "./components/UserUI";
import { sortProductsByPrice } from "./utils/utils";

const App = () => {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const navigate = useNavigate();

  const fetchProductData = async () => {
    let apiURL = "https://dummyjson.com/products";
    let fetchData = await fetch(apiURL);
    let response = await fetchData.json();
    setProducts(response.products);
  };

  // Fetching product list
  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Ensure products is an array before attempting to filter
  const filteredAndSortedProducts = sortProductsByPrice(
    Array.isArray(products)
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [],
    sortOrder
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<UserUI />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <div className="product-list-container-main pt-[7%] bg-gray-100">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  All the Product Goodness
                </h1>
                <div className="search-filter w-[85%] m-auto flex justify-between">
                  <input
                    type="search"
                    placeholder="Search product name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    className="p-2 mb-4 border rounded border-gray-300"
                  />
                  <div className="filter-by-price flex">
                    <button
                      onClick={() => handleSort("asc")}
                      className={`${
                        sortOrder === "asc"
                          ? "bg-blue-500 hover:bg-blue-700"
                          : "bg-gray-300 hover:bg-gray-400"
                      } text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
                    >
                      Low to high
                    </button>
                    <button
                      onClick={() => handleSort("desc")}
                      className={`${
                        sortOrder === "desc"
                          ? "bg-blue-500 hover:bg-blue-700"
                          : "bg-gray-300 hover:bg-gray-400"
                      } ms-3 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
                    >
                      High to low
                    </button>
                  </div>
                </div>
                <div className="product-list-container-main flex flex-wrap justify-center">
                  {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((item) => (
                      <ProductCard key={item.id} {...item} />
                    ))
                  ) : (
                    <p className="text-center text-gray-600">
                      No products found.
                    </p>
                  )}
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;