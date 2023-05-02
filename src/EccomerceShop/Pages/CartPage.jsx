import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppSpinner from "../components/AppSpinner";
import { toast } from "react-toastify";
import { CartStore } from "../context/CartStore";
import {
  FaPlusCircle,
  FaMinusCircle,
  FaTrashAlt,
  FaMoneyBillAlt,
  FaCartArrowDown,
} from "react-icons/fa";
import axios from "axios";
import { API, HTTP } from "../config/Api";
const CartPage = () => {
  const { state, dispatch } = useContext(CartStore);

  const navigate = useNavigate();
  const {
    cart: { cartItems },
  } = state;
  console.log(cartItems);

  let cartDispatch = dispatch;

  const CartUpdateHandler = async (it, quantity) => {
    // const { data } = await axios.get("http://localhost:9000/data/" + it._id);
    const { data } = await API.get("single-product/" + it._id);
    console.log(data.data);
    if (data.data.stock < quantity) {
      toast.warning("stock is finished");
    }
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { ...it, quantity },
    });
  };

  const removeItemHandler = (it) => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: it,
    });
  };

  const proceedToCheckOut = () => {
    navigate("/login?redirect=/shipping");
  };
  return cartItems.length === 0 ? (
    <div className="flex h-screen justify-center items-center gap-2  sm:gap-4">
      <p className="text-sm text-red-500 animate-bounce flex items-center gap-2">
        cart is empty
        <FaCartArrowDown />
      </p>
      <Link to={"/"} className="border-b-2 border-black uppercase font-bold">
        go to Home
      </Link>
    </div>
  ) : (
    <section className="flex gap-5 sm:gap-10 flex-wrap px-2 sm:px-6">
      <div className=" flex  flex-col justify-center gap-5 sm:gap-10 w-[98%] sm:w-[60%] ">
        {cartItems.map((it) => {
          return (
            <div
              key={it._id}
              className="flex justify-around items-center h-[80px] border shadow-lg"
            >
              <img
                src={`${HTTP}/${it.images[0]}`}
                alt={it.name}
                className="h-[60px] w-[80px] rounded-lg border-2"
              />
              <p className="text-gray-700 text-sm">{it.name}</p>
              <p className="text-gray-500 text-sm">${it.price}</p>
              <div className="flex items-center gap-2">
                <button
                  className="text-gray-500 text-xl sm:text-2xl"
                  disabled={it.quantity == 1}
                  onClick={() => CartUpdateHandler(it, it.quantity - 1)}
                >
                  <FaMinusCircle />
                </button>
                <p>{it.quantity}</p>
                <button
                  className="text-gray-500 text-xl sm:text-2xl"
                  disabled={it.quantity == it.stock}
                  onClick={() => CartUpdateHandler(it, it.quantity + 1)}
                >
                  <FaPlusCircle />
                </button>
              </div>
              <div>
                <span onClick={() => removeItemHandler(it)}>
                  <FaTrashAlt />
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center w-[98%] sm:w-[30%] border h-fit p-4 gap-2">
        <p className="border-b-2">
          Total-Items: {cartItems.reduce((a, c) => a + c.quantity, 0)}
        </p>
        <p className="border-b-2">
          Total-Price: {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </p>
        <button
          disabled={cartItems.length === 0}
          onClick={proceedToCheckOut}
          className="text-xs sm:text-sm mt-3 w-[240px] sm:w-full bg-purple-500 h-[34px] text-white hover:bg-purple-700 rounded-md"
        >
          Proceed To Checkout
        </button>
      </div>
    </section>
  );
};

export default CartPage;
