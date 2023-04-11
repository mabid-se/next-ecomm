import { createStore } from "redux";
import { loadState, saveState } from "./localStorage";

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

const persistedState = loadState();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});

export default store;
