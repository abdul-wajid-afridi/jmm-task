import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppStore } from "../context/AppStore";
import { toast } from "react-toastify";
import AppInput from "../components/AppForms/AppInput";
import AppButton from "../components/AppForms/AppButton";
import AppForm from "../components/AppForms/AppForm";
import { API } from "../config/Api";

const LoginPage = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const { AppState, AppDispatch } = useContext(AppStore);

  const token = AppState?.userInfo?.token;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("signin", {
        email,
        password,
      });
      AppDispatch({ type: "USER_SIGNIN", payload: await data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      toast.success("log in success");
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate(redirect);
    }
  }, [redirect, navigate, token]);

  return (
    <div className="sm:grid place-items-center px-4 sm:px-0">
      <p className="text-center mb-10 border-b-2 text-purple-500 border-purple-500">
        Login Page
      </p>
      <AppForm onSubmit={handleLogin}>
        <AppInput
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <AppInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <AppButton onClick={handleLogin}>Login</AppButton>

        <Link
          to={`/signup?redirect=${redirect}`}
          className="mt-3 text-xs text-purple-400"
        >
          Sign Up
        </Link>
      </AppForm>
    </div>
  );
};

export default LoginPage;
