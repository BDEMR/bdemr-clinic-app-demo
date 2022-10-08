import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CardActions,
  Dialog,
  DialogTitle,
  DialogActions,
  CardContent,
  Skeleton,
} from "@mui/material";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import SideNavbar from "../Sidebar/SideNavbar";
import { useTheme } from "@mui/material/styles";
import { colors } from "../../src/theme";
import { appStyles } from "../../styles/appStyle";
import Link from "next/link";
import Image from "next/image";
import userIconImage from "../../src/assets/avatar2.png";
import AppButton from "../../reusables/AppButton";
import { DatePicker, TimeInput } from "@mantine/dates";
import SearchAndSelectuser from "../SearchAndSelectUser/SearchAndSelectuser";
import { authOrganization, authUser } from "../../src/utils/authUser";
import { AvatarGroup } from "@material-ui/lab";

import userAvatar from "../../src/assets/avatar2.png";
import SingleUserCard from "../../reusables/singleUserCard";
import {
  $computeAge,
  $computeAgeExtraMonths,
  $toTwoDecimalPlace,
  getFormaatedDate,
} from "../../src/utils/common-computes";
import SearchAndSelectItem from "../SearchAndSelectItem/SearchAndSelectItem";
import SelectCategory from "../../reusables/SelectCatagory";
import SearchAndSelectInvoiceItem from "./SearchAndSelectInvoiceItem";
import {
  generateSerialForCustomIncomeCategory,
  generateSerialForIncome,
  generateSerialForTestAdvisedInvestigation,
  generateSerialInvoiceCategory,
} from "../../src/assets/serialGenerator";
import {
  categories,
  discountByCategories,
  patientStatusArray,
} from "./StaticInvoiceData";
import { useSnackbar } from "notistack";
import MedicineModal from "./MedicineModal";
import call_Api from "../../src/utils/call_Api";
import { StylesContext } from "@material-ui/styles";
import IncomeTextField from "./IncomeTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import InvestigationModal from "./InvestigationModal";
import { Router, useRouter } from "next/router";
import NoDataAlert from "../../reusables/NoDataAlert";
// import SelectOrCreateItem from "./SelectOrCreateItem";
import PageStackLoader from "../../reusables/PageStackLoader";
import InvoiceTextField from "./InvoiceTextField";
import InvoiceItem from "./InvoiceItem";
import TableTextField from "./TableTextField";
import {
  getNewIncomeObject,
  getTestAdvisedObject,
  _getDiscountedPrice,
} from "./computations";
import IncomeTableRow from "./IncomeTableRow";
import InvoiceAutoComplete from "./InvoiceAutoComplete";
import AppAutoComplete from "../../reusables/AppAutoComplete";
import { SettingsInputComponent } from "@mui/icons-material";
import { isSameMinute } from "date-fns";
import { Transition } from "@mantine/core";
import SelectOrCreateItem from "../../reusables/SelectOrCreateItem";
const styles = { boldText: { fontWeight: "600", fontSize: "1.2em" } };

const AccountsIncomeEditor = () => {
  const theme = useTheme();
  const router = useRouter();
  const today = new Date();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [user, setUser] = useState();
  const [organization, setOrganization] = useState();
  const [income, setIncome] = useState();
  const [incomeDue, setIncomeDue] = useState(0);
  const [incomeGross, setIncomeGross] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [incomeItem, setIncomeItem] = useState();
  const [testAdvisedObject, setTestAdvisedObject] = useState();
  const [isTestAdvisedValid, setIsTestAdvisedValid] = useState();
  const [userLoading, setUserLoading] = useState(false);
  const [discountType, setDiscountType] = useState();
  const [foundPatientList, setFoundPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  const [openMedicineModal, setOpenMedicineModal] = useState(false);
  const [openInvestigationModal, setOpenInvestigationModal] = useState(false);
  const handleCloseMedicineModal = () => setOpenMedicineModal(false);
  const handleCloseInvestigationModal = () => setOpenInvestigationModal(false);
  const [toDeleteIndex, setToDeleteIndex] = useState(null);
  const [invoiceGrossPrice, setInvoiceGrossPrice] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [previouseDue, setPreviouseDue] = useState(0);
  const [calculatedDueAfterDiscount, setCalculatedDueAfterDiscount] =
    useState(0);
  const [invoiceDiscount, setInvoiceDiscount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [badDebtOrDiscount, setBadDebtOrDiscount] = useState(0);
  const [patientHasBadDebt, setpatientHasBadDebt] = useState(false);
  const [hasTestAdvisedAdded, setHasTestAdvisedAdded] = useState(false);
  const [incomeCategoryList, setIncomeCategoryList] = useState([]);
  const [invoiceDataList, setInvoiceDataList] = useState([]);
  const [showCommissionForm, setShowCommissionForm] = useState(false);
  const [availableToPatient, setAvailableToPatient] = useState(true);
  const [medicineLoading, setMedicineLoading] = useState(false);
  const [investigationLoading, setInvestigationLoading] = useState(false);
  const [medicineList, setMedicineList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [investigationList, setInvestigationList] = useState([]);
  const [customDeliveryDate, setCustomDeliveryDate] = useState(new Date());
  const [selectedPatientMedicationList, setSelectedPatientMedicationList] =
    useState([]);
  const [
    selectedPatientInvestigationList,
    setSelectedPatientInvestigationList,
  ] = useState([]);

  const _makeNewIncomeItem = (user, organization) => {
    let incomeObj = getNewIncomeObject(user, organization);
    setIncome(incomeObj);
  };

  const _makeNewTestAdvisedObject = (userSerial, organizationId) => {
    let data = getTestAdvisedObject(userSerial, organizationId);
    setTestAdvisedObject(data);
    setIsTestAdvisedValid(true);
  };

  const showWarning = (warningMessage = "Warning") => {
    enqueueSnackbar(warningMessage, {
      variant: "warning",
    });
  };

  async function fetchData() {
    return new Promise(async function (resolve, reject) {
      const userData = await authUser();
      const organizationData = await authOrganization();
      resolve({ userData, organizationData });
    });
  }

  async function fetchItem() {
    return new Promise(async function (resolve, reject) {
      fetchData().then((data) => {
        setUser(data.userData);
        setOrganization(data.organizationData);
        // setSettings(data.settingsData);
        // console.log("settinmgssssssssssssss", data.settingsData.data.data);
        console.log("userData", data.userData);
        // setForce(!force);
        resolve({ user: data.userData, organization: data.organizationData });
      });
    });
  }

  useEffect(() => {
    console.log("=============IN USEEFFECT==============");
    fetchItem().then((data) => {
      setLoading(false);
      console.log(" user, organization from useEffect", user, organization);
      console.log("from useEffect", data);
      let { user, organization } = data;
      _loadIncomeCategories(organization.idOnServer, user);
      _makeNewIncomeItem(user, organization);
      _makeNewTestAdvisedObject(user.serial, organization.idOnServer);
      _makeNewItem();
    });
  }, []);

  useEffect(() => {
    console.log("2.0 useEffect--> income:", income);
    calculateGrossPrice();
    calculateTotalBilled(incomeGross, income?.discount, income?.vatOrTax);
  }, [income?.data, refresh]);

  useEffect(() => {
    console.log("3.0 useEffect--> income:", incomeGross);
    calculateTotalBilled(incomeGross, income?.discount, income?.vatOrTax);
  }, [incomeGross, income?.discount, income?.vatOrTax]);

  const _loadIncomeCategories = async (organizationIdentifier, user) => {
    let data = {
      apiKey: user.apiKey,
      organizationId: organizationIdentifier,
    };
    try {
      const incomeCategoryResponse = await call_Api(
        "/bdemr--organization-income-invoice-category-list",
        data
      );
      console.log("incomeCategoryResponse:", incomeCategoryResponse);
      let incomeCategoryList = incomeCategoryResponse.data.data;
      if (incomeCategoryResponse.data.hasError) {
        console.log(
          "organization-patient-invoice-category-list response error:",
          incomeCategoryResponse.data.error.message
        );
      } else if (incomeCategoryList.length) {
        setIncomeCategoryList(incomeCategoryList);
      } else {
        // setIncomeCategoryList(
        //   _makeNewInvoiceCategoryList(organizationIdentifier, user.serial)
        // );
      }
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const calculateGrossPrice = () => {
    if (!income?.data) return;
    let gross = income.data.reduce((total, item) => {
      return (total += item.qty * item.unitPrice);
    }, 0);
    setIncomeGross(gross);
  };

  const calculateTotalBilled = (gross, discount, vat) => {
    console.log(
      "calculateTotalBilled-->gross, discount, vat",
      gross,
      discount,
      vat
    );
    let totalBilled =
      parseFloat(gross) -
      parseFloat(discount ? discount : 0) +
      parseFloat(vat ? vat : 0);
    setIncome({ ...income, totalBilled });
  };

  const vatTaxInputChanged = (e) => {
    let vatOrTax = parseFloat(e.target.value);
    const vatOrTaxtAmt = (incomeGross * vatOrTax) / 100;
    setIncome({ ...income, vatOrTax: vatOrTaxtAmt });
  };

  const calculateNewDiscount = () => {
    if (!invoiceDiscount) return;
    let discountAmt = discountType ? 1 : 0;
    console.log("discountAmt", discountAmt);
  };

  const invoiceItemAutocompleteSelected = (item) => {
    console.log("selected item", item);
    // console.log("selected item object", _makeNewAddedInvestigationObject(item));
    let tempInvoice = { ...income };
    if (income?.data?.length) {
      let isDuplicate = false;
      let tempData = [];
      for (const investigation in income.data) {
        if (investigation.investigationIdOnServer === item._id) {
          isDuplicate = true;
        } else {
          tempData.push(investigation);
        }
      }
      if (isDuplicate) {
        console.log("isDuplicate:", isDuplicate);
        tempData.push(item);
        tempInvoice = { ...income, data: tempData };
        tempInvoice.totalBilled = tempInvoice.totalBilled + item.price;
        setIncome(tempInvoice);
        calculateGrossPrice(tempInvoice);
        // calculateTotalBilled(tempInvoice);
        setRefresh(!refresh);
        return enqueueSnackbar("Item Updated", {
          variant: "success",
        });
      }
    }
    const newObj = _makeNewAddedInvestigationObject(item);
    let initialPrice = item?.price || 0;
    let initialActualCost = item.actualCost || 0;
    let initialQty = 1;
    let initialTotalPrice = initialPrice * initialQty;
    const prepareddata = {
      itemId: item._id,
      name: newObj.investigationName,
      visitSerial: null,
      discountAmount: item.discountAmount || 0,
      discountType: item.discountType,
      discountedPrice: _getDiscountedPrice(
        item.discountAmount,
        item.discountType,
        initialPrice,
        initialQty
      ),
      advisedTestSerial: testAdvisedObject.serial,
      investigationSerial: newObj.serial,
      investigationIdOnServer: newObj.investigationIdOnServer,
      price: initialPrice,
      actualCost: initialActualCost,
      totalPrice: initialTotalPrice,
      qty: initialQty,
      stock: item.quantity,
      category: item?.category,
      location: item?.location,
      tag: item.tag || "",
    };
    tempInvoice.totalBilled = tempInvoice.totalBilled + initialTotalPrice;
    tempInvoice?.data?.push(prepareddata);
    // invoice.data.push(prepareddata);
    setIncome(tempInvoice);
    calculateGrossPrice(tempInvoice);
    console.log("invoice:", income);
  };

  const updateInvoiceObjectsWithNewPatient = (newPatient) => {
    // console.log("newPatient---->", newPatient);
    setIncome({
      ...income,
      patientName: newPatient.name,
      patientPhone: newPatient.phone,
      patientEmail: newPatient.email,
    });
    setTestAdvisedObject({
      ...testAdvisedObject,
      patientSerial: newPatient?.serial,
    });
  };

  const referredDoctorSelected = (user) => {
    setIncome({
      ...income,
      referralDoctor: {
        name: user.name,
        mobile: user.phone,
        id: user.serial,
      },
    });
  };

  const handlePaidAmountChange = (paid) => {
    console.log("paid:", paid);
    // paid = Number(paid);
    setIncome({ ...income, paid });
    setTotalPaid(paid);
  };
  const handleSaveIncome = () => {
    console.log("######## handleSaveIncome ###########");
    console.log("invoice:", income);
    console.log("incomeItem:", incomeItem);
  };

  const cacluateDue = (totalBilled, totalAmountReceieved) => {
    let due =
      parseFloat(totalBilled) -
      parseFloat(totalAmountReceieved ? totalAmountReceieved : 0);
    return due > 0 ? $toTwoDecimalPlace(due) : 0;
  };
  const deleteItemClicked = (index) => {
    setUpdating(true);
    console.log("deleteItemClicked index", index);
    // domHost.showModalPrompt('Are you sure to Delete this Item', (yes) => {
    if (true) {
      let tempData = [...income?.data];
      console.log("before delete temepdata", tempData);
      tempData.splice(index, 1);
      console.log("temepdata", tempData);
      setDataList(tempData);
      setIncome({ ...income, data: tempData });
      setRefresh(!refresh);
      setUpdating(false);
    }
    // })
  };
  const handleCustomerDetails = (e, filedname) => {
    const value = e.target.value;
    let customerDetails = {
      ...income.customerDetails,
    };
    customerDetails[filedname] = value;
    setIncome({ ...income, customerDetails });
  };

  const incomeCategoryCustomSet = (categoryName) => {
    // let categoryName = e.detail.trim();
    console.log("incomeCategoryCustomSet- categoryName", categoryName);
    let found = incomeCategoryList.some(
      (item) => item.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (!found) {
      let newCategory = {
        serial: generateSerialForCustomIncomeCategory(),
        createdDatetimeStamp: new Date(),
        createdByUserSerial: user.serial,
        organizationId: organization.idOnServer,
        lastModifiedDatetimeStamp: new Date(),
        name: categoryName,
      };
      app.db.upsert(
        "organization-accounts-income-categories",
        newCategory,
        ({ serial }) => serial === newCategory.serial
      );
      push("incomeCategories", newCategory);
      incomeItem.categoryId = newCategory.serial;
    }
  };

  const handleIncomeItem = (e, filedname) => {
    let value = e.target.value;
    if (!isNaN(Number(value))) {
      value = Number(value);
    }
    let tempItem = { ...incomeItem };
    tempItem[filedname] = value;
    setIncomeItem(tempItem);
  };
  const handleIncomeItemCategory = (value) => {
    if (!value) return;
    let tempItem = { ...incomeItem };
    tempItem["categoryId"] = value.serial;
    tempItem["category"] = value.name;
    setIncomeItem(tempItem);
  };
  const _makeNewItem = () => {
    setIncomeItem({
      name: "",
      category: "",
      categoryId: "",
      qty: 1,
      unitPrice: 0,
      actualCost: 0,
    });
  };
  const _validateNewItem = (incomeItem) => {
    console.log("_validateNewItem income:", incomeItem);
    let { name, category, qty, unitPrice } = incomeItem;
    // if (!name || !category || !qty || !unitPrice) {
    if (!name || !qty || !unitPrice) {
      return false;
    }
    return true;
  };
  const addItemButtonClicked = () => {
    // return console.log(incomeItem)
    let valid = _validateNewItem(incomeItem);
    if (valid) {
      incomeItem.qty = parseInt(incomeItem.qty);
      incomeItem.unitPrice = parseFloat(incomeItem.unitPrice);
      if (incomeItem.actualCost)
        incomeItem.actualCost = parseFloat(incomeItem.actualCost);
      console.log("income:", income);
      console.log("incomeItem:", incomeItem);
      let tempData = [...income?.data];
      tempData.push(incomeItem);
      setDataList(tempData);
      setIncome({ ...income, data: tempData });
      console.log("final income:", { ...income, data: tempData });
      _makeNewItem();
      // setIncomeItem({});
    } else {
      return showWarning("Please Correct the Input");
    }
  };

  const [open, setOpen] = useState(false);
  const [customVisitDate, setCustomVisitDate] = useState(today);
  const [customVisitTime, setCustomVisitTime] = useState(today.getTime());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    console.log("time:", date);
    console.log("date:", customVisitDate);
    // let invoiceDateTime = +new Date(`${customVisitDate} ${customVisitTime}`);
    // // set('income.createdDatetimeStamp', invoiceDateTime)
    // setIncome({ ...income, createdDatetimeStamp: invoiceDateTime });
  };

  const _validateIncomeObject = (income) => {
    if (!income.data.length || !income.totalAmountReceieved) {
      showWarning("Please Add Some Item and Input Received Amount");
      return false;
    }
    if (income.totalAmountReceieved > income.totalBilled) {
      showWarning("Amount Recieved Can not be greater than Amount Billed");
      return false;
    }
    return true;
  };
  const saveButtonClicked = () => {
    console.log("income @ saveButtonClicked", income);
    let valid = _validateIncomeObject(income);
    if (!valid) return;

    // Converting Input to Number Type
    if (income.discount) income.discount = parseFloat(income.discount);
    if (income.totalAmountReceieved)
      income.totalAmountReceieved = parseFloat(income.totalAmountReceieved);

    if (!income.serial) income.serial = generateSerialForIncome(user);
    income.lastModifiedDatetimeStamp = Date.now();
    let invoiceDateTime = +new Date(`${customVisitDate} ${customVisitTime}`);
    // // set('income.createdDatetimeStamp', invoiceDateTime)
    // setIncome({ ...income, createdDatetimeStamp: invoiceDateTime });
    const data = {
      apiKey: user.apiKey,
      income: income,
    };
    setIsSaving(true);
    try {
      const response = call_Api(
        "/bdemr--clinic-add-income-from-income-manager",
        data
      );
      if (response?.data?.hasError) {
        showError(response.data?.error?.message);
      } else if (response?.data?.data) {
        showWarning("Saved Successfully!");
      }
      _makeNewIncomeItem(user, organization);
    } catch (err) {
      showError("Could not save income");
      console.log("Could not save income, ERROR:", err);
    }
    setIsSaving(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ mt: 4, pb: 4 }}>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            paddingRight: "0.5rem",
            paddingLeft: "4rem",
          }}
        >
          <SideNavbar title="Accounts Income Editor" />
          <br />

          {loading ? (
            <PageStackLoader />
          ) : (
            <Grid container rowSpacing={5} paddingTop={5}>
              <Grid item xs={12} lg={12} sx={{ mx: 5 }}>
                {/* {loading ? <LinearProgress color="success" /> : null} */}
                <Card sx={{ minWidth: 275 }}>
                  <CardActions style={{ backgroundColor: colors.light }}>
                    <Grid
                      item
                      xs={6}
                      style={{ display: "flex", justifyContent: "start" }}
                    >
                      <Typography
                        style={{ color: colors.textDark, margin: "10px" }}
                        variant="h5"
                      >
                        Customer Information
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingLeft: "10px",
                      }}
                    ></Grid>
                  </CardActions>
                  <CardContent sx={{ p: 5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6}>
                        <IncomeTextField
                          label="Name"
                          filedName="name"
                          handleOnChange={handleCustomerDetails}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <IncomeTextField
                          label="Phone"
                          filedName="phone"
                          handleOnChange={handleCustomerDetails}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <IncomeTextField
                          label="Address"
                          filedName="address"
                          handleOnChange={handleCustomerDetails}
                          size="medium"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={12} sx={{ mx: 5 }}>
                {/* {loading ? <LinearProgress color="success" /> : null} */}
                <Card sx={{ minWidth: 275 }}>
                  <CardActions style={{ backgroundColor: colors.light }}>
                    <Grid item xs={6} sx={{ margin: "0.5rem 1rem" }}>
                      <Typography
                        sx={{
                          color: colors.textDark,
                          fontWeight: "bold",
                          mb: 1.5,
                        }}
                        variant="h5"
                      >
                        Items
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingLeft: "10px",
                      }}
                    ></Grid>
                  </CardActions>
                  <CardContent sx={{ pb: 5 }}>
                    {updating ? (
                      <Stack spacing={0} sx={{ m: 5 }}>
                        {/* For variant="text", adjust the height via font-size */}
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={70}
                          sx={{ borderBottom: "1px solid white" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={400}
                        />
                      </Stack>
                    ) : (
                      <Box>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            marginTop: "20px",
                            px: 5,
                          }}
                        >
                          <IncomeTextField
                            label="Item Name"
                            filedName="name"
                            handleOnChange={handleIncomeItem}
                            defaultValue={incomeItem?.name}
                            sx={{ width: "25%" }}
                          />
                          <AppAutoComplete
                            label="Category"
                            options={incomeCategoryList}
                            defaultValue={incomeItem?.category}
                            handleSelect={(category) => {
                              console.log("Category:", category);
                              handleIncomeItemCategory(category);
                            }}
                            sx={{ width: "25%" }}
                          />
                          <SelectOrCreateItem
                            defaultValue={incomeItem?.category}
                            setValue={(category) =>
                              handleIncomeItemCategory(category)
                            }
                            label="Invoice Type"
                            sx={{ width: "300px" }}
                            fullWidth={true}
                            categories={incomeCategoryList || []}
                            handleChange={(category) => {
                              console.log("Category:", category);
                              handleIncomeItemCategory(category);
                            }}
                          />
                          <IncomeTextField
                            label="Qty"
                            filedName="qty"
                            defaultValue={incomeItem?.qty}
                            handleOnChange={handleIncomeItem}
                            sx={{ width: "15rem" }}
                            type="Number"
                          />
                          <IncomeTextField
                            label="Retail Price"
                            filedName="unitPrice"
                            // defaultValue={incomeItem?.actualCost}
                            handleOnChange={handleIncomeItem}
                            sx={{ width: "15rem" }}
                            type="Number"
                          />
                          <IncomeTextField
                            label="Unit Cost (Invisible)"
                            filedName="actualCost"
                            handleOnChange={handleIncomeItem}
                            type="Number"
                            sx={{ width: "15rem" }}
                          />
                          <AppButton
                            title="Add"
                            variant="contained"
                            onClick={addItemButtonClicked}
                          />
                        </Stack>
                        <Box
                          sx={{
                            marginTop: "20px",
                            px: 5,
                          }}
                        >
                          <Grid
                            container
                            spacing={2}
                            // sx={{ backgroundColor: "yellow" }}
                          >
                            <Grid
                              item
                              md={12}
                              // sx={{ backgroundColor: "green" }}
                            >
                              <TableContainer component={Paper}>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell colSpan={2}>
                                        Item Name
                                      </TableCell>
                                      <TableCell>Category</TableCell>
                                      <TableCell>Qty</TableCell>
                                      <TableCell>Unit Price</TableCell>
                                      <TableCell>Total</TableCell>
                                      <TableCell align="right">
                                        Actions
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {income?.data?.map((item, index) => {
                                      return (
                                        <IncomeTableRow
                                          data={item}
                                          key={index}
                                          index={index}
                                          // handleChange={
                                          //   invoiceItemAutocompleteSelected
                                          // }
                                          deleteItemClicked={(index) => {
                                            setToDeleteIndex(index);
                                            handleClickOpen();
                                          }}
                                        />
                                      );
                                    })}
                                    <Dialog
                                      open={open}
                                      // TransitionComponent={Transition}
                                      keepMounted
                                      onClose={handleClose}
                                      aria-describedby="alert-dialog-slide-description"
                                    >
                                      <Box sx={{ px: 5, py: 2 }}>
                                        <DialogTitle sx={{}}>
                                          {"Are you sure to Delete this Item?"}
                                        </DialogTitle>
                                        <DialogActions>
                                          <AppButton
                                            onClick={handleClose}
                                            title="Cancel"
                                          />
                                          <AppButton
                                            onClick={() => {
                                              deleteItemClicked(toDeleteIndex);
                                              handleClose();
                                            }}
                                            title="Confirm"
                                            color="error"
                                          />
                                        </DialogActions>
                                      </Box>
                                    </Dialog>
                                  </TableBody>
                                </Table>
                                {!dataList ? (
                                  <NoDataAlert message="No Item Selected" />
                                ) : null}
                              </TableContainer>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    )}
                    <Box
                      sx={{
                        marginTop: "20px",
                        px: 5,
                      }}
                    >
                      <InvoiceItem label="Gross">
                        <Typography>
                          {$toTwoDecimalPlace(incomeGross)} BDT
                        </Typography>
                      </InvoiceItem>
                      <InvoiceItem label="Discount Amt.">
                        <Grid item md={6}>
                          <InvoiceTextField
                            onChange={(e) => {
                              let tempIncome = {
                                ...income,
                                discount: Number(e.target.value),
                              };
                              setIncome(tempIncome);
                            }}
                            // defaultValue={totalPaid}
                            // required={true}
                            // sx={{ width: "5rem" }}
                            // minValue={minValue}
                          />
                        </Grid>
                      </InvoiceItem>

                      <InvoiceItem label="Vat/Tax Percentage %">
                        <TextField
                          type="number"
                          InputLabelProps={{ shrink: true }}
                          onChange={vatTaxInputChanged}
                          defaultValue={selectedPatient?.name}
                          value={income?.vatTax ? income?.vatTax : null}
                          variant="outlined"
                          size="small"
                        />
                      </InvoiceItem>

                      <InvoiceItem label="Vat/Tax">
                        <Typography>
                          {$toTwoDecimalPlace(income.vatOrTax)} BDT
                        </Typography>
                      </InvoiceItem>
                      <InvoiceItem label="Total Billed" sx={styles.boldText}>
                        <Typography sx={styles.boldText}>
                          {$toTwoDecimalPlace(income.totalBilled)} BDT
                        </Typography>
                      </InvoiceItem>
                      <InvoiceItem label="Received">
                        <InvoiceTextField
                          onChange={(e) => {
                            handlePaidAmountChange(Number(e.target.value));
                          }}
                        />
                      </InvoiceItem>
                      <InvoiceItem label="Due" sx={styles.boldText}>
                        <Typography>{incomeDue} BDT</Typography>
                      </InvoiceItem>
                      <InvoiceItem
                        label="Total Amount Received:"
                        sx={styles.boldText}
                      >
                        <Typography sx={styles.boldText}>{"0 BDT"}</Typography>
                      </InvoiceItem>
                      <InvoiceItem label="Date and Time">
                        <DatePicker
                          allowFreeInput
                          defaultValue={today}
                          onChange={setCustomVisitDate}
                          style={{ marginRight: "10px" }}
                          withAsterisk
                        />
                        <TimeInput
                          format="12"
                          defaultValue={today}
                          onChange={setCustomVisitTime}
                        />
                      </InvoiceItem>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{ px: 5, py: 2, borderTop: "1px solid lightgrey" }}
                  >
                    <Grid
                      container
                      xs={12}
                      sm={12}
                      md={12}
                      sx={{
                        ...appStyles.flexRowSpaceBetween,
                        // pt: 2,
                      }}
                      spacing={1}
                    >
                      <Grid
                        item
                        xs={6}
                        style={{ display: "flex", justifyContent: "start" }}
                      >
                        <AppButton
                          variant="contained"
                          title="Print Preview"
                          sx={{ width: "100%" }}
                          // startIcon="fluent:save-28-filled"
                          startIcon="material-symbols:print-rounded"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingLeft: "10px",
                        }}
                      >
                        <AppButton
                          variant="contained"
                          title="Cancel"
                          sx={{ width: "100%" }}
                          // startIcon="fluent:save-28-filled"
                          startIcon="fluent:cancel-24-filled"
                          onClick={handleSaveIncome}
                        />
                        <AppButton
                          variant="contained"
                          title="Save Income"
                          sx={{ width: "100%" }}
                          loadingButton={true}
                          loading={isSaving}
                          startIcon="fluent:save-24-filled"
                          onClick={saveButtonClicked}
                        />
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AccountsIncomeEditor;
