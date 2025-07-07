import axios, { AxiosResponse } from "axios";

axios.defaults.timeout = 60000;
axios.defaults.headers.common["device-type"] = "WEB";
axios.defaults.headers.common["is-debug"] = "0";
axios.defaults.headers.common["app-version"] = "1.0";
axios.defaults.headers.common["environment"] = "development";
axios.defaults.headers.common["locale-code"] = "en";

axios.defaults.headers.common["app-signature"] = "";

const handleSuccess = (response) => {
  switch (response.status) {
    case 200:
      //console.log(response, "handleSuccess");
      // toast.success(<ToastContent title="Module" description="Message" />, {
      //   transition: Slide,
      //   hideProgressBar: true,
      //   autoClose: false,
      // });
      // handleSuccess(response);
      break;
    case 201:
      //  console.log(response, "handleCreateSuccess");
      // toast.success(
      //     <ToastContent
      //         title={response.data.title || "Module"}
      //         message={response.data.message || "Module Add Successfully."}
      //     />,
      //     {
      //         transition: Slide,
      //         hideProgressBar: false,
      //         autoClose: 2000,
      //     }
      // );
      break;
    default:
      //  handleUnknownError();
      break;
  }
};

const handleClientError = (response) => {
  switch (response.status) {
    case 400:
      // console.log(response.data.message, "handleClientError");
      // toast.error(
      //     <ToastContent
      //         title="Module"
      //         message={response.data.message || "Something went wrong."}
      //     />,
      //     {
      //         transition: Slide,
      //         hideProgressBar: false,
      //         autoClose: true,
      //     }
      // );
      // handleSuccess(response);
      break;
    case 401:
      //   console.log(response, "handleCreateSuccess");
      // toast.error(
      //     <ToastContent
      //         title={response.data.title || "Module"}
      //         message={response.data.message || "Module Add Successfully."}
      //     />,
      //     {
      //         transition: Slide,
      //         hideProgressBar: true,
      //         autoClose: 2000,
      //     }
      // );
      break;
    default:
      //  handleUnknownError();
      break;
  }
};

const getRange = (code) => {
  if (code >= 200 && code < 300) {
    return "SUCCESS_RANGE";
  }
  if (code >= 400 && code < 500) {
    return "CLIENT_ERROR_RANGE";
  }
  if (code >= 500 && code < 600) {
    return "SERVER_ERROR_RANGE";
  }
  return "UNKNOWN";
};

const handleResponse = (response) => {
  const range = getRange(response.status);
  //  console.log(range, "range");
  switch (range) {
    case "SUCCESS_RANGE":
      handleSuccess(response);
      break;
    case "CLIENT_ERROR_RANGE":
      handleClientError(response);
      break;
    case "SERVER_ERROR_RANGE":
      //  handleServerError();
      break;
    case "UNKNOWN":
      //  handleUnexpectedError();
      break;
    default:
      //  handleUnknownError();
      break;
  }
};

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
});

export const axiosAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
});

axiosInstance.interceptors.response.use(
  (response) => {
    handleResponse(response);
    return Promise.resolve(response);
  },
  (error) => {
    console.log(error.response, "error.response");
    handleResponse(error.response);
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    handleResponse(response);
    console.log(response, "axiosAuth.interceptors.response.use.response");
    return Promise.resolve(response);
  },
  (error) => {
    console.log(error.response, "error.response");
    handleResponse(error.response);
    console.log(error, "axiosAuth.interceptors.response.use.error");
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("accessToken")
  )}`;
  return config;
});
