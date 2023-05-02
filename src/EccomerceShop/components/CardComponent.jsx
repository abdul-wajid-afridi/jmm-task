import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API, HTTP } from "../config/Api";
import { CartStore } from "../context/CartStore";

const CardComponent = ({ it }) => {
  const navigate = useNavigate();
  const { state: states, dispatch: cartDispatch } = useContext(CartStore);
  const {
    cart: { cartItems },
  } = states;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((it) => it._id == item._id);
    console.log("check quantity" + existItem);
    let quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get("/data/" + item._id);
    if (data.products.stock < quantity) {
      return alert("out Of Stock");

      // in this step returns means do not go down for dispatch() just return this alert and do not go further
    }
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { ...it, quantity },
    });
  };
  return (
    <div
      className="shadow-md flex flex-col h-[320px] w-[230px]"
      onClick={(e) => navigate("/product-detail/" + it._id)}
    >
      <img
        src={`${HTTP}/${it.images[0]}`}
        className="h-[220px] w-full"
        alt=""
      />
      <div className="flex flex-col gap-1 text-sm text-gray-600 capitalize pl-2">
        <p>{it.name}</p>
        <p>{it.brand}</p>
        {it.stock == 0 ? (
          <p className="text-sm text-gray-500 border w-fit p-1">Out Of stock</p>
        ) : (
          <button
            onClick={() => addToCartHandler(it)}
            className="text-white bg-purple-500 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/50 w-[120px] h-[30px] rounded-lg "
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
