// import { loginTokenHeader, generalHeader } from '../../auth-header';
import axios from "axios";
import { adminApi } from "../../api";
import _ from "lodash";

//Add users data
export const addUserApiCall = async (data) => {
  const { email, status, ...rest } = data;
  const formData = {
    email: email,
    status: status,
    user_info: rest,
  };
  return await axios.post(
    adminApi.users,
    formData
    //{ headers: loginTokenHeader() }
  );
};

//Get users data list
export const getUsersApiCall = async (params) => {
  return await axios.get(
    `${adminApi.users}`,
    { params }
    //{ headers: loginTokenHeader() }
  );
};

//Get a user data by id
export const getUserApiCall = async (id) => {
  return await axios.get(
    `${adminApi.users}/${id}`
    //{ headers: loginTokenHeader() }
  );
};

//Delete a user by id
export const deleteUserApiCall = async (id) => {
  return await axios.delete(
    `${adminApi.users}/${id}`
    //{ headers: loginTokenHeader() }
  );
};

//Update a user data by id
export const updateUserApiCall = async (id, data) => {
  const { email, status, ...rest } = data;
  const formData = {
    email: email,
    status: status,
    user_info: rest,
  };
  return await axios.patch(
    `${adminApi.users}/${id}`,
    formData
    //{ headers: loginTokenHeader() }
  );
};

//Update a user data by id
export const updateUserStatusApiCall = async (id, data) => {
  return await axios.patch(
    `${adminApi.users}/${id}`,
    data
    //{ headers: loginTokenHeader() }
  );
};

//Get users data list
export const getExportUsersApiCall = async (params) => {
  return await axios.get(
    `${adminApi.users}/export/users`,
    { params }
    //{ headers: loginTokenHeader() }
  );
};

//Get Feedback data list
export const getFeedbackApiCall = async (params) => {
  return await axios.get(
    `${adminApi.feedback}`,
    { params }
    //{ headers: loginTokenHeader() }
  );
};
