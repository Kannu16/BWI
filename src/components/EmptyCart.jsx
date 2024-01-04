/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";

const EmptyCartPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-4">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
          to="/products"
          className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600"
        >
          Explore Products
        </Link>
        </div>
      </div>
    </>
  );
};

export default EmptyCartPage;
