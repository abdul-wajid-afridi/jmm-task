import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartPage from "./Pages/CartPage";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import OrderPage from "./Pages/OrderPage";
import ProductDetails from "./Pages/ProductDetails";
import ShippingPage from "./Pages/ShippingPage";
import SignUpPage from "./Pages/SignUpPage";
import AdminPage from "./Pages/admin/AdminPage";
import GetOrder from "./Pages/GetOrder";

const Navigations = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/product-detail/:Pid" element={<ProductDetails />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/get-order/:id" element={<GetOrder />} />
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route
          path="/*"
          element={
            <p className="text-center text-red-400">!No Page Found again</p>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
