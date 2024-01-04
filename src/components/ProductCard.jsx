/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, emptyCart } from "../slices/cartSlice";

const ProductCard = (productlist) => {
  const { id, title, description, price, thumbnail, onAddToCart } =
    productlist || {};
  const dispatch = useDispatch();
  const cartItemsList = useSelector((store) => store.cart.cartItems);

  const [isAddedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    const isItemInCart = cartItemsList.some((item) => item.id === id);
    if (!isItemInCart) {
      dispatch(
        addToCart({
          id,
          title,
          description,
          price,
          thumbnail,
          onAddToCart,
        })
      );
      setAddedToCart(true);
    } else {
      dispatch(emptyCart(id));
      setAddedToCart(false); // Fix: Corrected the function name
    }
  };

  return (
    <>
      <div className="product">
      <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 m-5 rounded">
        <a href="#">
          <img
            src={thumbnail}
            alt="Product image"
            className="h-60 w-72 object-cover rounded-t"
          />
        </a>
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {title}
          </p>
          <div>
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {description}
            </span>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${price}
              </p>
              <div className="ml-auto">
                <button
                  onClick={handleAddToCart}
                  className="p-[5px] rounded text-center"
                  style={{
                    backgroundColor: isAddedToCart ? "green" : "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill={isAddedToCart ? "#fff" : "currentColor"}
                    className="bi bi-bag-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProductCard;
