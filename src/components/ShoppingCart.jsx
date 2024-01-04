/* eslint-disable react/jsx-key */
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import EmptyCartPage from "./EmptyCart";

const ShoppingCart = () => {
  const cartItemsList = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch()
  console.log(cartItemsList)

  //Carts total quantity
  const totalQuantity = cartItemsList.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  //total cart value
  const totalCartValue = cartItemsList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
     <div className="container mx-auto relative">
        <div className="flex absolute w-full top-[100px]">
          <div className="w-2/3 bg-white p-8 shadow-md">
            <div className="flex justify-between border-b pb-4">
              <h1 className="font-semibold text-xl">Shopping Cart</h1>
              <h2 className="font-semibold text-xl">{totalQuantity} Items</h2>
            </div>
            <div className="flex mt-6 mb-4">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Total
              </h3>
            </div>
            {cartItemsList.length === 0 ? (<EmptyCartPage />) : 
              cartItemsList.map((item) => (
                <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-4 px-6 py-4">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24 object-cover"
                        src={item.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.title}</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={item.quantity}
                    />
                    <button onClick={()=> dispatch(addToCart(item))}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${item.price}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            <Link
              to="/products"
              className="flex font-semibold text-indigo-600 text-sm mt-6"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div
            id="summary"
            className="w-1/4 p-8 fixed right-0 shadow-md"
          >
            <h1 className="font-semibold text-xl border-b pb-4">
              Order Summary
            </h1>
            <div className="flex justify-between mt-6 mb-4">
              <span className="font-semibold text-sm uppercase">
                Items {totalQuantity}
              </span>
              <span className="font-semibold text-sm">${totalCartValue}</span>
            </div>
            <div className="py-6">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-2 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full border"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-4 text-sm uppercase">
                <span>Total cost</span>
                <span>${totalCartValue}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-2 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
