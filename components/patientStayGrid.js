import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TextField } from "@mui/material";
import { Grading, Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";


export default function Grids({
  data,
  setInvoice,
  invoice,
  setData,
  name,
  setName,
}) {
  const router = useRouter();

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center">Date</TableCell>
            <TableCell>
              <TextField
                id="demo-simple-select"
                value={invoice}
                placeholder="Search by phone"
                onChange={(e) => {
                   setInvoice(e.target.value);
                  let value = e.target.value.toLowerCase();
                  let body = data?.filter((item) =>
                    item.patientPhone.includes(value)
                  );
                  setData(body);
                }}
                fullWidth
                color="secondary"
              />
            </TableCell>
            <TableCell align="right"> Catogeries</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">
              <TextField
                id="demo-simple-select"
                value={name}
                placeholder="Search by Name"
                onChange={(e) => {
                  setName(e.target.value);
                  let value = e.target.value.toLowerCase();
                  let body = data?.filter((item) =>
                    item.patientName.toLowerCase().includes(value)
                  );
                  setData(body);
                }}
                fullWidth
                color="secondary"
              />
            </TableCell>
            <TableCell align="center">Recieved</TableCell>
            <TableCell align="right">Total </TableCell>
            <TableCell sx={{pl:5, bg:'red'}} align=" center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
            
              <TableCell align="left">
                {new Date(row?.createdDatetimeStamp).toLocaleString()}
              </TableCell>
              <TableCell sx={{pl:5}} component="th" scope="row">
              fd  {row?.patientPhone}
              </TableCell>
              <TableCell align="right">d{row?.discountBy}</TableCell>
              <TableCell align="right">{row?.discount}</TableCell>
              <TableCell align="right">{row?.patientName}</TableCell>
              <TableCell align="right">{row?.totalAmountReceieved}</TableCell>
              <TableCell align="right">{row?.totalBilled}</TableCell>
              <TableCell sx={{ display: 'flex' }} align="right">
                <IconButton >
                  <Grading />
                </IconButton>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}