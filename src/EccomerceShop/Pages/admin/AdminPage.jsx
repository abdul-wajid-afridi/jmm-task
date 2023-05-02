import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppStore } from "../../context/AppStore";

const AdminPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const { AppState, AppDispatch } = useContext(AppStore);

  const token = AppState?.userInfo?.token;
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate(redirect);
    }
  }, [redirect, navigate, token]);
  return <div></div>;
};

export default AdminPage;
