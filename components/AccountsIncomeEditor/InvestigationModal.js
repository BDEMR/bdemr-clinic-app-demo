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
import { getFormattedDateTime } from "../../src/utils/common-computes";
import NoDataAlert from "../../reusables/NoDataAlert";

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
    fontSize: 12,
    color: colors.textLight,
  },
};

const InvestigationModal = ({
  user,
  openInvestigationModal,
  handleCloseInvestigationModal: handleCloseInvestigationModal,
  investigationList,
  setInvestigationList,
  selectedPatientInvestigationList,
  setSelectedPatientInvestigationList,
  patientSerial,
  handleAddSelectedInvestigationToInvoice:
    handleAddSelectedInvestigationToInvoice,
}) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const [openInvestigationModal, setOpenInvestigationModal] = React.useState(false);
  // const handleOpenInvestigationModal = () => setOpenInvestigationModal(true);
  // const handleCloseInvestigationModal = () => setOpenInvestigationModal(false);
  // const [tempInvestigationList, setTempInvestigationList] = useState([
  //   ...selectedPatientInvestigationList,
  // ]);
  let tempInvestigationList = [...selectedPatientInvestigationList];

  useEffect(() => {
    // getPatientCurrentInvestigationList();
  }, []);
  const getPatientCurrentInvestigationList = async () => {
    return new Promise(async (resolve, reject) => {
      let data = {
        apiKey: user?.apiKey,
        patientSerial: patientSerial,
        userId: user?.idOnServer,
      };
      const response = await call_Api(
        "/bdemr-non-resulted-advised-test-list",
        data
      );
      if (response.data.hasError) reject(response.data.error);
      else if (response.data.data) {
        resolve(response.data.data);
        let foundList = response.data.data;
        foundList.sort((left, right) => {
          if (left.createdDatetimeStamp > right.createdDatetimeStamp) {
            return -1;
          }
          if (left.createdDatetimeStamp < right.createdDatetimeStamp) {
            return 1;
          }
          return 0;
        });
        setInvestigationList(foundList);
      }
      console.log("response:", response);
    });
  };

  const ItemCheckBox = ({ item }) => {
    const [checked, setChecked] = React.useState(item.isSelected);

    useEffect(() => {
      tempInvestigationList.find((med) => {
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
          let investigation = { ...item };
          investigation.isSelected = isChecked;
          let found = false;
          if (true) {
            let filteredInvestigations = tempInvestigationList.filter((med) => {
              if (med.productId === item.productId) {
                found = true;
              } else {
                return med;
              }
            });
            if (!found) {
              filteredInvestigations.push(investigation);
            }
            console.log("filteredInvestigations:", filteredInvestigations);
            // setSelectedPatientInvestigationList(filteredInvestigations);
            tempInvestigationList = filteredInvestigations;
          }
          // investigationList.map((investigation) => {
          //   if (investigation.productId === item.productId) {
          //     console.log("found->", investigation);
          //     investigation.isSelected = isChecked;
          //     tempInvestigationList.push(investigation);
          //     setSelectedPatientInvestigationList(tempInvestigationList);
          //     console.log("tempInvestigationList->", tempInvestigationList);
          //   }
          // });
          // console.log("tempInvestigationList", tempInvestigationList);
          // setInvestigationList(tempInvestigationList);
          //       tempInvestigationList = @selectedPatientInvestigationList
          // tempInvestigationList = tempInvestigationList.map (item) => { ...item, isSelected: e.target.checked }
          // @set 'selectedPatientInvestigationList', tempInvestigationList
        }}
      />
    );
  };

  return (
    <div>
      {/* <Button onClick={handleOpenInvestigationModal}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openInvestigationModal}
        onClose={handleCloseInvestigationModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openInvestigationModal}>
          <Box sx={styles.modalStyle}>
            {/* {isActionLoading ? <LinearProgress color="success" /> : null} */}
            <Card sx={{ minWidth: 275 }}>
              <CardActions
                style={{
                  backgroundColor: "#12B176",
                  ...appStyles.flexRowCenter,
                }}
              >
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: "center", color: colors.white }}
                >
                  Patient Current Investigation
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
                    {/* <TableHead>
                      <TableRow>
                        <TableCell>Sl.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead> */}
                    <TableBody>
                      {investigationList?.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Typography>
                                {item?.data?.investigationName}
                                <Typography sx={styles.textSmall}>
                                  Advised by: {item?.doctorName} on{" "}
                                  {getFormattedDateTime(
                                    item.createdDatetimeStamp
                                  )}
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
                  {!investigationList.length ? (
                    <NoDataAlert message="No Investigation Found" />
                  ) : null}
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
                  onClick={handleCloseInvestigationModal}
                />
                {investigationList.length ? (
                  <AppButton
                    variant="contained"
                    title="Add to Invoice"
                    sx={{ alignSelf: "flex-end" }}
                    startIcon="bx:cart-add"
                    onClick={() => {
                      handleCloseInvestigationModal();
                      handleAddSelectedInvestigationToInvoice(
                        tempInvestigationList
                      );
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
export default InvestigationModal;
