import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartStoreProvider } from "./EccomerceShop/context/CartStore";
import { AppStoreProvider } from "./EccomerceShop/context/AppStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  // <React.StrictMode>
  <AppStoreProvider>
    <CartStoreProvider>
      <ToastContainer />
      <App />
    </CartStoreProvider>
  </AppStoreProvider>
  // </React.StrictMode>
);
