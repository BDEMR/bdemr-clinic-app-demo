import axios from "axios";
// import { mode } from "../../scripts/deploy";

export const mode = "production"; // can be - 'production' or 'development'

const serverHost = {
//   development: "http://localhost:8671/api/1",
  production: "https://bdemr.services/api/1",
};
const axiosConfig = {
  baseURL: serverHost[mode],
};
const apiClient = axios.create(axiosConfig);
apiClient.interceptors.request.use(function (config) {
  config.headers = { "content-type": "text/plain" };
  return config;
});

const call_Api = (endPonint, data) => {
  const requestData = {
    ...data,
    __meta: {
      clientIdentifier: "bdemr-clinic-app",
      clientName: "bdemr",
      clientVersion: "1.0.0",
      clientPlatform: "web",
    },
  };
  return apiClient.post(endPonint, requestData);
};


export default call_Api;