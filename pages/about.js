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
          Single Data
        </Typography>
        <Box maxWidth="sm">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">#Invoice</TableCell>
                  <TableCell align="right">Discount By</TableCell>
                  <TableCell align="right">Discount Found Name</TableCell>
                  <TableCell align="right">Fund Discount</TableCell>
                  <TableCell align="right">Recieved</TableCell>
                  <TableCell align="right">Total </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(data?.createdDatetimeStamp).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{data?.invoiceType}</TableCell>
                  <TableCell align="right">{data?.discountBy}</TableCell>
                  <TableCell align="right">{data?.discount}</TableCell>
                  <TableCell align="right">{data?.organizationName}</TableCell>
                  <TableCell align="right">
                    {data?.totalAmountReceieved}
                  </TableCell>
                  <TableCell align="right">{data?.totalBilled}</TableCell>
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
