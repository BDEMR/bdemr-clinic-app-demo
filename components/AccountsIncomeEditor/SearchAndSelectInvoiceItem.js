import {
  Autocomplete,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Avatar2 from "@mui/material/Avatar";
// import Avatar3 from "@mui/material/Avatar";
import Avatar3 from "../../src/assets/avatar2.png";
import Image from "next/image";
import bringData from "../../src/utils/bringData";
import Styles from "../../styles/Dashboard.module.css";
import { appStyles } from "../../styles/appStyle";
import call_Api from "../../src/utils/call_Api";
// import Styles from "../styles/Dashboard.module.css";
const SearchAndSelectInvoiceItem = ({
  user,
  organization,
  selectedItem,
  setSelectedItem,
  label = "Patient Phone  Number",
  size = "small",
  variant = "patient",
  selectedCategory = null,
  handleSelectInvoiceItem = () => null,
}) => {
  const [matchingPatientdata, setMatchingPatientdata] = useState([]);
  // const [selectedPatient, setSelectedUser] = useState();
  const [foundItemList, setFoundItemList] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const patientSelected = (e) => {
    console.log("gg", e);
    let value = matchingPatientdata[e];
    setSelectedItem(value);
    // return userSelectedForm(newScheduleSelected);
  };
  let endPoint = "/bdemr-get-organization-inventory";
  if (variant === "doctor") {
    endPoint = "/bdemr--clinic-referral-doctor-search";
    label = "Doctor Phone Number";
  }
  const getFilterItem = () => {
    if (!selectedCategory || selectedCategory?.name === "all") return null;
    else return selectedCategory.name;
  };
  const _searchInventoryItem = async (searchQuery) => {
    // console.log("searchText:", searchText);
    console.log("in HandlefindPatients ==>");
    if (searchQuery?.length < 1)
      return console.log("Please Enter Patient info");
    setUserLoading(true);
    try {
      const requestData = {
        apiKey: user.apiKey,
        organizationId: organization.idOnServer,
        filterBy: getFilterItem(),
      };
      let invoiceItemListResponse = await call_Api(endPoint, requestData);
      console.log("invoiceItemListResponse", invoiceItemListResponse);
      if (invoiceItemListResponse?.data?.hasError) {
        setFoundItemList([]);
        // setError(foundPatientListResponse?.data?.error?.message);
      } else if (invoiceItemListResponse?.data?.data) {
        setFoundItemList(invoiceItemListResponse?.data?.data);
        // console.log("THE foundPatientList:", foundPatientList);
        // setSearchText("");
        setUserLoading(false);
      }
    } catch (err) {
      console.log("Something went Wrong, ERROR:", err);
    }
    setUserLoading(false);
  };

  //   _searchInventoryItem: (searchQuery)->
  //     data =
  //       apiKey: @user.apiKey
  //       organizationId: @organization.idOnServer
  //       filterBy:
  //         category: if @selectedCategory and @selectedCategory.name isnt 'all' then @selectedCategory.name else null
  //         name: searchQuery.trim()

  //     # console.log 'query', data
  //     @fetchingInventoryItemSearchResult = true;
  //     @domHost.callApi '/bdemr-get-organization-inventory', data, (err, response)=>
  //       @fetchingInventoryItemSearchResult = false
  //       if response.hasError
  //         @domHost.showModalDialog response.error.message
  //       else
  //         @set 'invoiceSourceDataList', []
  //         items = response.data
  //         # # sort items by name
  //         # items.sort (prev, after)->
  //         #   return -1 if prev.name < after.name
  //         #   return 1 if prev.name > after.name
  //         #   return 0
  //         autocompleteList = ({label: item.name, price:item.price, quantity:item.quantity, value: item} for item in items)

  //         # remove any item that is quantifiable and quantity is zero
  //         for item, index in autocompleteList
  //           if item.value.hasQuantity && item.quantity <= 0
  //             delete autocompleteList[index]

  //         @set 'invoiceSourceDataList', autocompleteList
  //         # console.log 'source list', @invoiceSourceDataList

  return (
    <Autocomplete
      size={size}
      fullWidth
      disablePortal
      //   id="doctor"
      //   name="repDoctor.name"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={foundItemList}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) =>
        option.idOnServer === value.idOnServer
      }
      filterOptions={(x) => x}
      // sx={{ width: 300 }}
      loading={userLoading}
      loadingText="Looking for patients"
      defaultValue={selectedItem ? selectedItem.number : null}
      renderOption={(props, option, state) => (
        <Box
          key={option._id}
          component="li"
          sx={{
            "& > img": { flexShrink: 0 },
            m: 0,
            p: 0,
            borderBottom: "1px solid grey",
          }}
          {...props}
          onClick={(e) => {
            // onPatientSelect(option);
            console.log("option", option);
            setSelectedItem(option);
            handleSelectInvoiceItem ? handleSelectInvoiceItem(option) : null;
            setOpen(false);
          }}
        >
          <Box sx={{}}>
            <Typography sx={{ textAlign: "left" }}>
              {console.log("item:", option)}
              {option?.name}
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {option?.quantity} pcs
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {option?.price} BDT
            </Typography>
          </Box>
        </Box>
      )}
      onChange={(e, value) => {
        console.log("search triggred");
        const filteredPatient =
          // foundPatientList.find(
          //   (organization) =>
          //     organization.id === value.id
          // );
          console.log(filteredPatient);
        if (filteredPatient) {
          console.log({
            filteredOrganization: filteredPatient,
          });
          // setOrganizationWasSelected(true);
        }
        const roleList = filteredPatient?.userRoleList;
        // setSelectedOrganization(
        //   filteredPatient
        // );
        // setUserRoleList(roleList);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          placeholder={selectedItem?.phone || "Search By Name"}
          value={selectedItem?.name || null}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {userLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          onChange={(e) => {
            console.log(e.target.value);
            _searchInventoryItem(e.target.value);
          }}
        />
      )}
    />
  );
};

export default SearchAndSelectInvoiceItem;
