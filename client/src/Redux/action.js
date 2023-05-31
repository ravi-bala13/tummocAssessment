const { SET_TOKEN, SET_ISLOADING } = require("./actionTypes");

export const setToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

export const setIsLoading = (data) => ({
  type: SET_ISLOADING,
  payload: data,
});
