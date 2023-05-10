import React from "react";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Payments = () => {
  const [btnDisable, setBtnDisable] = useState(false);
  const { TotalPrice } = JSON.parse(sessionStorage.getItem("payments"));
  const { shippingData, cartItems } = useSelector((state) => state.CartSlice);
  const { user } = useSelector((state) => state.UserSlice);
  const dispatch = useDispatch();
  const orderInfo = JSON.parse(sessionStorage.getItem("payments"));

  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();
  // just converting into paisas
  const pays = {
    amount: Math.round(TotalPrice * 100),
  };
  const order = {
    shippingInfo: { ...shippingData, phoneNumber: shippingData.phoneNo },
    orderItems: cartItems,
    itemPrice: orderInfo.Total,
    taxPrice: orderInfo.Tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.TotalPrice,
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const { data } = await API.post("payments", pays);
    const client_secret = data.client_secret;

    if (!stripe || !element) return;
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: element.getElement(CardNumberElement),
        billing_details: {
          name: user.name,
          email: user.email,
          address: {
            line1: shippingData.address,
            city: shippingData.city,
            state: shippingData.state,
            postal_code: shippingData.pinCode,
            country: shippingData.country,
          },
        },
      },
    });
    if (result.error) {
      toast.error("there is a problem during payments");
    } else {
      if (result.paymentIntent.status == "succeeded") {
        // toast.success("payments done successfully");
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        dispatch(AsyncCreateOrders({ order, navigate, toast }));
        setBtnDisable(true);
        // navigate("");
      } else {
        toast.error("there is a problem with payments");
        setBtnDisable(false);
      }
    }
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <form onSubmit={handlePayment} className="flex flex-col gap-5 border">
        <div className="border-b-4 h-[40px] w-full sm:w-[340px]">
          <CardCvcElement />
        </div>
        <div className="border-b-4 h-[40px] w-full sm:w-[340px]">
          <CardExpiryElement />
        </div>
        <div className="border-b-4 h-[40px] w-full sm:w-[340px]">
          <CardNumberElement />
        </div>
        <AppButton disabled={btnDisable ? true : false} type="submit">
          {TotalPrice}-payAble
        </AppButton>
      </form>
    </section>
  );
};

export default Payments;
