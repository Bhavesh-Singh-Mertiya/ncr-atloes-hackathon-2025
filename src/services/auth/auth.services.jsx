import axios from "axios";
import { adminApi } from "../../api";

// access token for authentication
export function authTokenHeader() {
  let accessToken = localStorage.getItem("admin-token");
  // console.log('access token', accessToken)
  if (accessToken) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
  } else {
    window.location.reload(true);
    return {};
  }
}

export const loginApiCall = async (email, password) => {
  const formData = {
    email: email,
    password: password,
  };
  return await axios.post(
    adminApi.login,
    formData
    //{ headers: loginTokenHeader() }
  );
};

export const resetPasswordApiCall = async (email, key, password) => {
  const formData = {
    email: email,
    key: key,
    password: password,
  };
  return await axios.post(
    adminApi.updatePassword,
    formData
    //{ headers: generalHeader() }
  );
};

export const logoutApiCall = async () => {
  localStorage.removeItem("admin-token");
  localStorage.removeItem("admin-imageUrl");
  localStorage.removeItem("admin-firstName");
  localStorage.removeItem("admin-lastName");
  return await axios.post(adminApi.logout);
};

export const changePasswordApiCall = async (oldPassword, newPassword) => {
  const formData = {
    oldPassword,
    newPassword,
  };
  return await axios.post(`${adminApi.changePassword}`, formData, {
    headers: authTokenHeader(),
  });
};
