import React from 'react'

import call_Api from './call_Api';

const _loadDataFromApi = async (startDate, endDate) => {
  const query = {
    apiKey: TjUyL4myCxziIBpegdz6Vw1axhtFgvDpmVvRtgOYKQxAecrdfw8an3RzgeNIL3m5dtdZbs00FuBWBgqoxps58BBFfq95TrVmylTeKLTFBC1sh15U72VgufBiRnUSBHEE
    , // all the api call must needed an apikey
    organizationId: "5e3119c4e25dc07ca96ae0f1", // may not be requires for all api call
    //   other query data :
    searchParameters: {
      dateCreatedFrom: startDate,
      dateCreatedTo: endDate,
    },
  };
  setLoading(true); // loading starts
  try {
    // call_Api is a function that takes an endpoint and query data
    const incomeListResponse = await call_Api(
      "bdemr-organization-get-all-salary-sheet", //end point of api
      query // query data
    );
    console.log("incomeListResponse:", incomeListResponse);
    if (incomeListResponse.data.hasError) {
      handleError(incomeListResponse?.data?.error?.message); // handleError is/can bea function that handles erros
      return console.log(
        "incomeListResponse.data.error.message:",
        incomeListResponse.data.error.message
      );
    } else {
      setIncomeList(incomeListResponse?.data?.data); // set the data in a state
    }
  } catch (err) {
    // handle or catch error
    console.log("Error:", err.message);
    handleError(err.message);
  }
  setLoading(false); // done with api calling now loading stops
};


export default function api() {
  return (
    <div onClick={_loadDataFromApi}>hasd</div>
  )
}
