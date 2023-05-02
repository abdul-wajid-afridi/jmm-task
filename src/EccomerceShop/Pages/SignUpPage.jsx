import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppStore } from "../context/AppStore";
import { toast } from "react-toastify";
import AppForm from "../components/AppForms/AppForm";
import AppInput from "../components/AppForms/AppInput";
import AppButton from "../components/AppForms/AppButton";
import { API } from "../config/Api";

const SignUpPage = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const { AppState, AppDispatch } = useContext(AppStore);

  const token = AppState?.userInfo?.token;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("password Not Matched");
      return;
      // this return mean that do not continue to the rest code.
    }
    try {
      const { data } = await API.post("signup", {
        name,
        email,
        password,
      });
      AppDispatch({ type: "USER_SIGNUP", payload: data });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      toast.success("Register success");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate(redirect);
    }
  }, [redirect, navigate, token]);

  console.log(AppState);

  return (
    <div className="sm:grid place-items-center px-4 sm:px-0">
      <p className="text-center mb-10 border-b-2 text-purple-500 border-purple-500">
        Sign up
      </p>
      <AppForm onSubmit={handleSignup}>
        <AppInput
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />

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
        <AppInput
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <AppButton onClick={handleSignup}>Signup</AppButton>

        <Link
          to={`/login?redirect=${redirect}`}
          className="mt-3 text-xs text-purple-400"
        >
          Already Have an Acount
        </Link>
      </AppForm>
    </div>
  );
};

export default SignUpPage;
