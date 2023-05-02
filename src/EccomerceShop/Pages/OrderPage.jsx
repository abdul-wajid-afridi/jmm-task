import React, { useEffect, useReducer } from "react";
import { useContext } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressSteps from "../components/ProgressSteps";
import { API, HTTP } from "../config/Api";
import { AppStore } from "../context/AppStore";
import { CartStore } from "../context/CartStore";

const OrderPage = () => {
  // const { AppState, AppDispatch } = useContext(AppStore);
  const orderReducer = (state, action) => {
    switch (action.type) {
      case "ORDER_PENDING":
        return { ...state, loading: true };
      case "ORDER_SUCCESS":
        return { ...state, loading: false };
      case "ORDER_FAIL":
        return { ...state, loading: false, error: action?.payload };
      default:
        return state;
        break;
    }
  };
  const [{ loading, error }, dispatch] = useReducer(orderReducer, {
    loading: false,
    error: null,
  });
  const { state, dispatch: cartDispatch } = useContext(CartStore);
  const { AppState, AppDispacth } = useContext(AppStore);
  const roundUp = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  state.cart.itemsPrice = roundUp(
    state?.cart?.cartItems?.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  // console.log(localStorage.getItem("userInfo"));
  console.log(AppState.userInfo.token);
  state.cart.shippingPrice =
    state.cart.itemsPrice > 100 ? roundUp(0) : roundUp(10);
  state.cart.taxPrice = state.cart.itemsPrice * 0.15;
  state.cart.totalPrice =
    state.cart.itemsPrice + state.cart.shippingPrice + state.cart.taxPrice;

  const navigate = useNavigate();

  console.log(state?.cart?.cartItems);

  const { fullName, address, postalCode, city, country } =
    state?.cart?.shippingInfo;

  const handleOrder = async () => {
    try {
      dispatch({ type: "ORDER_PENDING", loading: true });
      const data = await API.post(
        "orders",
        {
          orderItems: state?.cart?.cartItems,
          shippingInfo: state?.cart?.shippingInfo,
          itemPrice: state.cart.itemsPrice,
          taxPrice: state.cart.taxPrice,
          shippingPrice: state.cart.shippingPrice,
          totalPrice: state.cart.totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${AppState.userInfo.token}`,
          },
        }
      );
      console.log(data.data.data._id);
      dispatch({ type: "ORDER_SUCCESS", loading: false });
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cartItems");
      navigate(`/get-order/${data.data.data._id}`);
    } catch (error) {
      dispatch({ type: "ORDER_FAIL", loading: false });
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    // if (!AppState?.userInfo?.token) {
    //   navigate("/login");
    // }
  }, []);
  return (
    <div>
      <ProgressSteps active1 active2 active3 active4 />
      <p className="text-center text-lg sm:text-3xl text-purple-500 mb-3">
        show Order
      </p>
      {/* for left and right */}
      <section className="flex justify-between  flex-wrap px-2 sm:px-5">
        <section className="flex flex-col gap-5 w-full sm:w-[65%] ">
          {/* shipping Info */}
          <div className="flex flex-col border gap-2 py-3 px-2 sm:px-5 rounded-md">
            <p className="text-gray-700 font-bold ">Shipping Data</p>
            <p className="text-gray-700 text-sm tracking-wide">
              <span className="font-bold text-black text-xs">Name</span> :{" "}
              {fullName}
            </p>
            <p className="text-gray-700 text-sm tracking-wide">
              <span className="font-bold text-black text-xs">Address</span> :
              {`${address} ${city}  ${country} ${postalCode}`}
            </p>
          </div>
          {/* cart Items */}
          <div className="flex flex-col border gap-2 py-3 px-2 sm:px-5 rounded-md mb-3">
            <p className="text-gray-700 font-bold ">Order Items</p>
            <div className="flex justify-between items-center border-b py-1 text-sm text-gray-500 capitalize">
              <div className="flex w-[50%]">
                <p className="mr-[55px] sm:mr-[75px]"></p>
                <p>name</p>
              </div>
              <p>quantity</p>
              <p>price</p>
            </div>
            {state?.cart?.cartItems.map((it) => {
              const { name, price, quantity, images } = it;
              return (
                <div className="flex justify-between items-center border-b py-1 text-sm">
                  <div className="flex items-center gap-2 w-[50%]">
                    <img
                      src={`${HTTP}/${images[0]}`}
                      className="h-[50px] sm:h-[70px] w-[50px] sm:w-[70px] rounded-md"
                    />
                    <p>{name}</p>
                  </div>
                  <p className="  w-[30%] text-end">{quantity}</p>
                  <p className="  w-[30%] text-end">${price}</p>
                </div>
              );
            })}
          </div>
        </section>
        <div className="flex flex-col sm:w-[30%] border rounded-md h-fit px-3 py-3 w-fit ">
          <p className="text-gray-700 font-bold mb-2">Order Summary</p>
          <p className="flex justify-between text-sm px-4 py-2 border-b text-gray-700 tracking-wide">
            <span>Items price</span>${state.cart.itemsPrice}
          </p>
          <p className="flex justify-between text-sm px-4 py-2 border-b text-gray-700 tracking-wide">
            <span>Shipping</span>${state.cart.shippingPrice}
          </p>
          <p className="flex justify-between text-sm px-4 py-2 border-b text-gray-700 tracking-wide">
            <span>Tax</span>${state.cart.taxPrice}
          </p>
          <p className="flex justify-between text-sm px-4 py-2 border-b text-gray-700 tracking-wide font-bold">
            <span>Total Price</span>${state.cart.totalPrice}
          </p>
          <button
            onClick={handleOrder}
            className="text-white self-center bg-purple-500 hover:bg-purple-700 hover:shadow-lg outline-none mt-3 hover:shadow-purple-600/50 w-[180px] sm:w-[180px] h-[30px] rounded-lg "
          >
            Place Order
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
