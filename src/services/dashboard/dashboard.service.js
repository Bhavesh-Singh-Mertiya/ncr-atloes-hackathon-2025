import { authTokenHeader } from "../auth-header";
import axios from "axios";
import { adminApi } from "../../api";
import _ from "lodash";

//Get a user data by id
export const getDashboardCountsApiCall = async (id) => {
  return await axios.get(`${adminApi.dashboardCount}`, {
    headers: authTokenHeader(),
  });
};

//Get a user data by id
export const getDashboardChartApiCall = async (params) => {
  return await axios.get(`${adminApi.adminChart}`, {
    params: params,
    headers: authTokenHeader(),
  });
};
