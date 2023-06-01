import { SET_ISLOADING, SET_TOKEN } from "./actionTypes";

const initState = {
  token: null,
  isLoading: false,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      };

    case SET_ISLOADING:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};
