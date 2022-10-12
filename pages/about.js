import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useRouter } from "next/router";
import jsonData from "../data.json";
const About = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState({});
  useEffect(() => {
    if (pid) {
      setData(jsonData?.data.find((item) => item._id === pid));
    }
  }, [pid]);
  //console.log(data);
  function getDate(date) {
    var dob = new Date(date);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    if (!age) {
      return "";
    }
    return age;
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          BDEMR
        </Typography>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>BDEMR</TableCell>
                  <TableCell align="right">Desc</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography>PID: {data?.serial}</Typography>
                      <Typography>
                        Patients Name: {data?.patientName}
                      </Typography>
                      <Typography>Phone: {data?.patientPhone}</Typography>
                      <Typography>
                        Gender: {data?.patientInfo?.gender}
                      </Typography>
                      <Typography>
                        Age:{data?.referenceNumber}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <Box>
                      <Typography>Age: {data?.referenceNumber}</Typography>
                      <Typography>
                        Date:
                        {new Date(
                          data?.createdDatetimeStamp
                        ).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}></TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontWeight: "bold" }}>
                      Total Billed:{data?.totalBilled} BDT
                    </Typography>
                    <Typography align="right">
                      Vat Tax:{data?.vatOrTax}
                    </Typography>
                    <Typography align="right">
                      Total Discount:{data?.discount} BDT
                    </Typography>
                    <Typography align="right" sx={{ fontWeight: "bold" }}>
                      Grand Total:{data?.totalBilled - data?.discount} BDT
                    </Typography>
                    <Typography align="right" sx={{ fontWeight: "bold" }}>
                      Total Paid:{data?.totalAmountReceieved} BDT
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                </TableRow>
                <TableRow>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

 
export default About;
