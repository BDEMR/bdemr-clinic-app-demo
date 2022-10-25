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