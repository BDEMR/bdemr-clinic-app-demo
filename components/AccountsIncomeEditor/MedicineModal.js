import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Backdrop,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { appStyles } from "../../styles/appStyle";
import call_Api from "../../src/utils/call_Api";
import { colors } from "../../src/theme";
import AppButton from "../../reusables/AppButton";

const styles = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    // maxWidth: "90%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    // p: 4,
  },
  textSmall: {
    fontSize: 10,
    color: colors.textLight,
  },
};

const MedicineModal = ({
  user,
  openMedicineModal,
  handleCloseMedicineModal,
  medicineList,
  setMedicineList,
  selectedPatientMedicationList,
  setSelectedPatientMedicationList,
  patientSerial,
  handleAddSelectedMedicineToInvoice,
}) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const [openMedicineModal, setOpenMedicineModal] = React.useState(false);
  // const handleOpenMedicineModal = () => setOpenMedicineModal(true);
  // const handleCloseMedicineModal = () => setOpenMedicineModal(false);
  // const [tempMedicineList, setTempMedicineList] = useState([
  //   ...selectedPatientMedicationList,
  // ]);
  let tempMedicineList = [...selectedPatientMedicationList];

  useEffect(() => {
    // getPatientCurrentMedicationList();
  }, []);
  const getPatientCurrentMedicationList = async () => {
    return new Promise(async (resolve, reject) => {
      let data = {
        apiKey: user?.apiKey,
        patientSerial: patientSerial,
      };
      const response = await call_Api(
        "/bdemr-get-patient-current-medication-list",
        data
      );
      if (response.data.hasError) reject(response.data.error);
      else if (response.data.data) {
        resolve(response.data.data);
        setMedicineList(response.data.data);
      }
      console.log("response:", response);
    });
  };

  const ItemCheckBox = ({ item }) => {
    const [checked, setChecked] = React.useState(item.isSelected);

    useEffect(() => {
      tempMedicineList.find((med) => {
        if (med.productId === item.productId) {
          setChecked(true);
        }
      });
    }, []);

    return (
      <Checkbox
        checked={checked}
        onChange={(e) => {
          let isChecked = e.target.checked;
          setChecked(isChecked);
          // handleUpdateInvoice(
          //   "availableToPatient",
          //   !availableToPatient
          // );
          // item.isSelected = true;
          console.log(e.target.checked);
          let medicine = { ...item };
          medicine.isSelected = isChecked;
          let found = false;
          if (true) {
            let filteredMedicines = tempMedicineList.filter((med) => {
              if (med.productId === item.productId) {
                found = true;
              } else {
                return med;
              }
            });
            if (!found) {
              filteredMedicines.push(medicine);
            }
            console.log("filteredMedicines:", filteredMedicines);
            // setSelectedPatientMedicationList(filteredMedicines);
            tempMedicineList = filteredMedicines;
          }
          // medicineList.map((medicine) => {
          //   if (medicine.productId === item.productId) {
          //     console.log("found->", medicine);
          //     medicine.isSelected = isChecked;
          //     tempMedicineList.push(medicine);
          //     setSelectedPatientMedicationList(tempMedicineList);
          //     console.log("tempMedicineList->", tempMedicineList);
          //   }
          // });
          // console.log("tempMedicineList", tempMedicineList);
          // setMedicineList(tempMedicineList);
          //       tempMedicineList = @selectedPatientMedicationList
          // tempMedicineList = tempMedicineList.map (item) => { ...item, isSelected: e.target.checked }
          // @set 'selectedPatientMedicationList', tempMedicineList
        }}
      />
    );
  };

  return (
    <div>
      {/* <Button onClick={handleOpenMedicineModal}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openMedicineModal}
        onClose={handleCloseMedicineModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openMedicineModal}>
          <Box sx={styles.modalStyle}>
            {/* {isActionLoading ? <LinearProgress color="success" /> : null} */}
            <Card sx={{ minWidth: 275 }}>
              <CardActions
                style={{
                  backgroundColor: "#12B176",
                  ...appStyles.flexRowCenter,
                  padding: "1rem",
                }}
              >
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: "center", color: colors.white }}
                >
                  Patient Current Medication
                </Typography>
              </CardActions>
              <CardContent
                style={{
                  // boxSizing: "content-box",
                  // border: "1px solid black",
                  backgroundColor: "#F5F5F5",
                  ...appStyles.flexRowSpaceEvenly,
                  flexWrap: "wrap",
                }}
              >
                <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sl.</TableCell>
                        <TableCell>Name</TableCell>
                        {/* <TableCell>Doses/Directions</TableCell> */}
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {medicineList?.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Typography>
                                {item?.data?.brandName}
                                <Typography sx={styles.textSmall}>
                                  {item?.data?.genericName}
                                </Typography>
                              </Typography>
                            </TableCell>
                            {/* <TableCell>{item?.data?.genericName}</TableCell> */}

                            <TableCell align="right">
                              {/* <Checkbox
                                checked={item.isSelected}
                                onChange={() => {
                                  // setAvailableToPatient(!availableToPatient);
                                  // handleUpdateInvoice(
                                  //   "availableToPatient",
                                  //   !availableToPatient
                                  // );
                                  item.isSelected = true;
                                }}
                              /> */}
                              <ItemCheckBox item={item} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <CardActions
                style={{
                  backgroundColor: colors.light,
                  ...appStyles.flexRowEnd,
                  padding: "1rem",
                }}
              >
                <AppButton
                  variant="outlined"
                  title="Cancel"
                  // color="light"
                  sx={{ alignSelf: "flex-end" }}
                  startIcon="ic:outline-close-fullscreen"
                  onClick={handleCloseMedicineModal}
                />
                {true ? (
                  <AppButton
                    variant="contained"
                    title="Add to Invoice"
                    sx={{ alignSelf: "flex-end" }}
                    startIcon="bx:cart-add"
                    onClick={() => {
                      handleCloseMedicineModal();
                      handleAddSelectedMedicineToInvoice(tempMedicineList);
                    }}
                  />
                ) : null}
              </CardActions>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default MedicineModal;
