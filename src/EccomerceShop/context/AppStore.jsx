import React, { createContext, useReducer } from "react";

export const AppStore = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNIN":
      return {
        ...state,
        userInfo: { ...state.userInfo, token: action.payload },
      };
    case "USER_SIGNUP":
      return {
        ...state,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

export const AppStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  });

  const value = { AppState: state, AppDispatch: dispatch };

  return <AppStore.Provider value={value}>{children}</AppStore.Provider>;
};

export default AppStoreProvider;
