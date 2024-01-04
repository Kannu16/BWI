import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { logoutUser } from '../slices/Authenticate';


const Navbar = () => {
const cartItemsList = useSelector((store) => store.cart.cartItems);

//Carts total quantity
const totalQuantity = cartItemsList.reduce((acc, item) => acc + item.quantity, 0);

const userName = useSelector((store) => store.auth.username);

const dispatch = useDispatch()


  return (
    <>
      <div className="navbar fixed w-full bg-gray-800 p-4 text-white z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Dummy icon on the left */}
          <span className="text-2xl">&#127796;</span>
          <span className="text-lg font-semibold">Product App</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Cart items count and username on the right */}
          <Link to="/cart"
            className="flex items-center space-x-2 relative mr-3 cursor-pointer"
          >
            <FiShoppingCart className="text-gray-300 text-3xl" />
            <span className="text-sm right-[-10px] top-[-8px] absolute font-semibold text-gray-300 p-[3px] text-center rounded-full bg-black">
              {totalQuantity}
            </span>
          </Link>
          <span>Welcome, <b>{userName}!</b></span>
           <button onClick={()=> dispatch(logoutUser())}> <IoMdLogOut /></button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar