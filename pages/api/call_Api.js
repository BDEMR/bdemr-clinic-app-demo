import axios from "axios";
// import { mode } from "../../scripts/deploy";



const _loadOrganization = async (cbfn) => {
  const currentOrganization = authOrganization();
  loadingCounter++;
  const data = {
    apiKey: user.apiKey,
    idList: [currentOrganization.idOnServer],
  };
  let response = await call_Api(
    "/bdemr-organization-list-organizations-by-ids",
    data
  );
  // loadingCounter--;
  console.log("_loadOrganization", response);
  if (response?.data.hasError) {
    enqueueSnackbar(response.data.error?.message, {
      variant: "error",
    });
  } else {
    if (response?.data.data.matchingOrganizationList?.length !== 1) {
      enqueueSnackbar("Invalid Organization", {
        variant: "info",
      });
    }
    setOrganization(response?.data.data.matchingOrganizationList[0]);
  }
};

export const mode = "production"; // can be - 'production' or 'development'

const serverHost = {
 // development: "http://localhost:8671/api/1",
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
