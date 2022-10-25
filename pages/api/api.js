import React from 'react'

export default function FF() {
    const _loadDataFromApi = async (startDate, endDate) => {
        const query = {
          apiKey: "i5wiFHg9uQEoIy93d2FojJs1ykm41Epr7HtxPkd83kFA8uZnXbzCr9DcaKPQIwYCFGTYyxSOl7cXmoLOGhWpDNw4s5Qsbl0ctyfjtxh9pyJ5wSdCnd2mvwIMzKGq8HGA"
          , // all the api call must needed an apikey
          //organizationId: organization?.idOnServer, // may not be requires for all api call
          //   other query data :
        //   searchParameters: {
        //     dateCreatedFrom: startDate,
        //     dateCreatedTo: endDate,
        //   },
        };
        //setLoading(true); // loading starts
        try {
          // call_Api is a function that takes an endpoint and query data
          const incomeListResponse = await call_Api(
            "https://bdemr.services/api/1/bdemr-organization-get-all-salary-sheet", //end point of api
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
         // handleError(err.message);
        }
        //setLoading(false); // done with api calling now loading stops
      };
      console.log(_loadDataFromApi)
      


  return (
    <div onClick={_loadDataFromApi}>hfa</div>
  )
}
