import axios from "axios";
import Cookies from "js-cookie";
import {
  REGISTER_USER,
  USER_LOGIN,
  USER_LOGOUT,
  PASSWORD_CHANGE,
} from "./types";

/* USER AUTHENTICATION GOES HERE */

export const registerUser = (formData) => async (dispatch) => {
  await axios.post("/auth/register", formData);

  dispatch({
    type: REGISTER_USER,
  });
};

export const userLogin = (formData) => async (dispatch) => {
  const res = await axios.post("/auth/login", formData);

  const {
    data: {
      token,
      user: { name, email },
    },
  } = res;

  Cookies.set("user", name, { expires: 1 });
  Cookies.set("email", email, { expires: 1 });
  Cookies.set("token", token, { expires: 1 });

  dispatch({
    type: USER_LOGIN,
    payload: res.data,
  });
};

export const userLogout = () => async (dispatch) => {
  /*
  const {
    token,
    user: { name, email },
  } = getState().auth;
  */

  Cookies.remove("user");
  Cookies.remove("email");
  Cookies.remove("token");

  dispatch({
    type: USER_LOGOUT,
  });
};

export const userPasswordChange = (formData) => async (dispatch, getState) => {
  const { token } = getState().auth;

  await axios.post("/auth/change/password", formData, {
    params: {
      token,
    },
  });

  dispatch({
    type: PASSWORD_CHANGE,
  });
};
