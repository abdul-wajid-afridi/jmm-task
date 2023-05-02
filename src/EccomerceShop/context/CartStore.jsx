import { createContext, useReducer } from "react";

export const CartStore = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let newItem = action.payload;
      console.log(newItem);
      let existItem = state.cart.cartItems.find((it) => it._id == newItem._id);
      let cartItems = existItem
        ? state.cart.cartItems.map((it) =>
            // this mean it._id is the data from cart which map  and exsit is the item whcih exxxist inside the cart already mean condition is true
            it._id === existItem._id ? newItem : it
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "REMOVE_FROM_CART": {
      const cartItems = state.cart.cartItems.filter((it) => {
        return it._id !== action.payload._id;
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CLEAR_CART":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "ADD_SHIPPING_INFO":
      return {
        ...state,
        cart: { ...state.cart, shippingInfo: action.payload },
      };
    default:
      return state;
    // return {
    //   ...state,
    //   items: {
    //     ...state.cart,
    //     cartItems: [...state.cart.cartItems, action.payload],
    //   },
    // };
  }
};

export const CartStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: {
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    },
    loading: false,
    error: null,
  });
  const value = { state, dispatch };
  return <CartStore.Provider value={value}>{children}</CartStore.Provider>;
};
