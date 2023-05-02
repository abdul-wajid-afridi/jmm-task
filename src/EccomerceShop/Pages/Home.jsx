import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import { API } from "../config/Api";
import { CartStore } from "../context/CartStore";

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const Home = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    products: [],
    loading: false,
    error: null,
  });
  const { products, loading, error } = state;

  useEffect(() => {
    const allProducts = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await API.get("products");
        dispatch({ type: "FETCH_SUCCESS", payload: data.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };

    allProducts();
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-4 sm:gap-7">
      {loading ? (
        <p>loading....</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        products.map((it) => {
          return <CardComponent it={it} key={it._id} />;
        })
      )}
    </div>
  );
};

export default Home;
