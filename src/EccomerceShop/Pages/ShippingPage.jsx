import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressSteps from "../components/ProgressSteps";
import { AppStore } from "../context/AppStore";
import { CartStore } from "../context/CartStore";

const ShippingPage = () => {
  const { state, dispatch } = useContext(CartStore);
  const { AppState } = useContext(AppStore);
  const navigate = useNavigate();

  const ship = state?.cart?.shippingInfo;

  const [fullName, setFullName] = useState(ship.fullName || "");
  const [address, setAddress] = useState(ship.address || "");
  const [postalCode, setPostalCode] = useState(ship.postalCode || "");
  const [city, setCity] = useState(ship.city || "");
  const [country, setCountry] = useState(ship.country || "");

  // console.log(AppState.userInfo.token);

  const handleShippingData = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_SHIPPING_INFO",
      payload: {
        fullName,
        address,
        postalCode,
        city,
        country,
      },
    });
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify({
        fullName,
        address,
        postalCode,
        city,
        country,
      })
    );
    navigate("/order");
  };

  useEffect(() => {
    if (!AppState?.userInfo?.token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <ProgressSteps active1 active2 />
      <div className="grid place-items-center">
        <p className="text-center my-4">Shipping</p>

        <form className="flex flex-col items-center gap-3 w-full sm:w-[440px] px-4 sm:px-0 ">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="FullName"
            className="h-[25px] sm:h-[34px] w-full  mx-0 sm:mx-3 border outline-none border-purple-500 pl-1  rounded-md"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="h-[25px] sm:h-[34px] w-full  mx-0 sm:mx-3 border outline-none border-purple-500 pl-1  rounded-md"
          />
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="PostalCode"
            className="h-[25px] sm:h-[34px] w-full  mx-0 sm:mx-3 border outline-none border-purple-500 pl-1  rounded-md"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="h-[25px] sm:h-[34px] w-full  mx-0 sm:mx-3 border outline-none border-purple-500 pl-1  rounded-md"
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className="h-[25px] sm:h-[34px] w-full  mx-0 sm:mx-3 border outline-none border-purple-500 pl-1  rounded-md"
          />
          <button
            onClick={handleShippingData}
            className="text-white bg-purple-500 hover:bg-purple-700 hover:shadow-lg outline-none mt-3 hover:shadow-purple-600/50 w-[180px] sm:w-[180px] h-[30px] rounded-lg "
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingPage;
