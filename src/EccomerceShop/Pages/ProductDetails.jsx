import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa";
import { useContext } from "react";
import { CartStore } from "../context/CartStore";
import AppSpinner from "../components/AppSpinner";
import { toast } from "react-toastify";
import { API, HTTP } from "../config/Api";

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_PRODUCT":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_PRODUCT":
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case "FAIL_PRODUCT":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

const ProductDetails = () => {
  const { Pid } = useParams();
  const navigate = useNavigate();
  const contextData = useContext(CartStore);

  const { state: cartState, dispatch: cartDispatch } = contextData;

  console.log(cartState);

  const [state, dispatch] = useReducer(reducer, {
    product: null,
    loading: false,
    error: null,
  });

  const { product, loading, error } = state;

  useEffect(() => {
    const getProduct = async () => {
      try {
        dispatch({ type: "REQUEST_PRODUCT" });
        // for getting a single product
        const { data } = await API.get("single-product/" + Pid);
        console.log(data.data);
        dispatch({ type: "FETCH_PRODUCT", payload: data.data });
      } catch (error) {
        dispatch({ type: "FAIL_PRODUCT", payload: error.message });
      }
    };

    getProduct();
  }, [dispatch, Pid]);

  const handleAddToCart = async () => {
    let existItem = cartState.cart.cartItems.find(
      (it) => it._id == product._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await API.get("single-product/" + Pid);
    if (data.data.stock < quantity) {
      toast.warning("stock is finished");
      return;
    }
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return loading ? (
    <AppSpinner />
  ) : error ? (
    <p>{error}</p>
  ) : (
    product && (
      <section className="flex justify-around flex-wrap gap-10 sm:gap-5">
        <div>
          <img
            src={`${HTTP}/${product.images[0]}`}
            className="h-[300px] w-[300px]"
            alt=""
          />
        </div>
        <div className="flex flex-col capitalize gap-2 text-gray-500">
          <p className="text-gray-700 text-3xl border-b">{product.name}</p>
          <p className="text-xs border-b w-fit">
            Description : {product.description}
          </p>
          <p className="text-xs border-b w-fit">
            Catagory : {product.category}
          </p>
          <p className="text-xs border-b w-fit">Brand : {product.brand}</p>
        </div>
        <div className="flex flex-col gap-3 h-fit shadow-lg p-4">
          <p className="text-xs border-b">price : {product.price}</p>
          <p
            className={`text-xs border-b ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            in Stock : {product.stock}
          </p>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 h-[35px] px-4 bg-purple-500 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/50"
          >
            Add To Cart <FaCartPlus />
          </button>
        </div>
      </section>
    )
  );
};

export default ProductDetails;
