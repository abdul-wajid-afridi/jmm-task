import axios from "axios";

export const HTTP = "http://localhost:9000/api_v1/";

// let token = JSON.parse(localStorage.getItem("userInfo"));
export const API = axios.create({
  baseURL: HTTP,
  // headers: {
  //   Authorization: `Bearer ${token?.token}`,
  // },
});
