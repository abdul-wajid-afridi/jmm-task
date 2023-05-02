import React, { useEffect, useReducer } from "react";
import { useContext } from "react";
import {
  useNavigate,
  useNavigation,
  useParams,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";
import ProgressSteps from "../components/ProgressSteps";
import { API, HTTP } from "../config/Api";
import { AppStore } from "../context/AppStore";
import { CartStore } from "../context/CartStore";

const GetOrder = () => {
  // const { AppState, AppDispatch } = useContext(AppStore);
  const { id } = useParams();
  console.log(id);
  const orderReducer = (state, action) => {
    switch (action.type) {
      case "ORDER_PENDING":
        return { ...state, loading: true };
      case "ORDER_SUCCESS":
        return { ...state, loading: false, order: action.payload };
      case "ORDER_FAIL":
        return { ...state, loading: false, error: action?.payload };
      default:
        return state;
        break;
    }
  };
  const [{ loading, error, order }, dispatch] = useReducer(orderReducer, {
    loading: false,
    error: null,
    order: [],
  });
  const { state, dispatch: cartDispatch } = useContext(CartStore);
  const { AppState, AppDispacth } = useContext(AppStore);
  console.log(order);
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      dispatch({ type: "ORDER_PENDING", loading: true });
      const data = await API.get(`single-order/${id}`, {
        headers: {
          Authorization: `Bearer ${AppState.userInfo.token}`,
        },
      });
      dispatch({
        type: "ORDER_SUCCESS",
        loading: false,
        payload: data.data?.data,
      });
      console.log(data.data?.data);
    } catch (error) {
      console.log(error);
      dispatch({ type: "ORDER_FAIL", loading: false });
    }
  };

  useEffect(() => {
    handleOrder();

    // if (!AppState?.userInfo?.token) {
    //   navigate("/login");
    // }
  }, []);
  return (
    <div>
      <p className="text-lg sm:text-3xl text-purple-500 mb-3 ml-10 ">
        Order <span className="text-gray-400">{id}</span>
      </p>
      {/* for left and right */}
      <section className="flex justify-between  flex-wrap px-2 sm:px-5">
        <section className="flex flex-col gap-5 w-full sm:w-[65%] ">
          {/* shipping Info */}
          <div className="flex flex-col border gap-2 py-3 px-2 sm:px-5 rounded-md">
            <p className="text-gray-700 font-bold ">Shipping Data</p>
            <p className="text-gray-700 text-sm tracking-wide">
              <span className="font-bold text-black text-xs">Name</span> :{" "}
              {order?.shippingInfo?.fullName}
            </p>
            <p className="text-gray-700 text-sm tracking-wide">
              <span className="font-bold text-black text-xs">Address</span> :
              {`${order?.shippingInfo?.address} ${order?.shippingInfo?.city}  ${order?.shippingInfo?.country} ${order?.shippingInfo?.postalCode}`}
            </p>
          </div>

          {/* types */}
          <div className="flex flex-col border gap-2 py-3 px-2 sm:px-5 rounded-md">
            <p className="text-gray-700 font-bold ">Shipping Data</p>
            <p className="text-gray-700 text-sm tracking-wide">
              <span className="font-bold text-black text-xs">is-Paid</span> :{" "}
              {order?.isPaid ? order?.paidAt : "not Paid"}
            </p>
            <p className="text-gray-700 text-sm tracking-wide">
              <span className="font-bold text-black text-xs">Delivered</span> :
              {order?.isDelivered ? "Delivered" : "not Delivered Yet"}
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
            {order?.orderItems?.map((it) => {
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
            <span>Items price</span>${order?.itemPrice}
          </p>
          <p className="flex justify-between text-sm px-4 py-2 border-b text-gray-700 tracking-wide">
            <span>Shipping</span>${order?.shippingPrice}
          </p>
          <p className="flex justify-between text-sm px-4 py-2 border-b text-gray-700 tracking-wide">
            <span>Tax</span>${order?.taxPrice}
          </p>
          <p className="flex justify-between text-sm px-4 py-2 border-b text-gray-700 tracking-wide font-bold">
            <span>Total Price</span>${order?.totalPrice}
          </p>
          <button
            // onClick={}
            className="text-white self-center bg-purple-500 hover:bg-purple-700 hover:shadow-lg outline-none mt-3 hover:shadow-purple-600/50 w-[180px] sm:w-[180px] h-[30px] rounded-lg "
          >
            Payment
          </button>
        </div>
      </section>
    </div>
  );
};

export default GetOrder;
