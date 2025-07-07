import axios from "axios";
import { adminApi } from "../../api";
import _ from "lodash";

//Upload File API
export const uploadFileApiCall = async (formData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  return await axios.post(adminApi.uploadFile, formData, config);
};
