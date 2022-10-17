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

// const Grids = React.forwardRef((props, ref) => (
//   <DataTable ref={ref} {...props} />
// ));

export default function Grids({
  data,
  refpropanothername,
  setInvoice,
  invoice,
  setData,
  name,
  setName,
}) {
  const router = useRouter();

  return (
    <TableContainer component={Paper} ref={refpropanothername}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TextField
                id="demo-simple-select"
                value={invoice}
                placeholder="Invoice #"
                onChange={(e) => {
                  setInvoice(e.target.value);
                  let value = e.target.value.toLowerCase();
                  let body = data?.filter((item) =>
                    item.referenceNumber.toLowerCase().includes(value)
                  );
                  setData(body);
                }}
                fullWidth
                color="secondary"
              />
            </TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right"> Catogeries</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">
              <TextField
                id="demo-simple-select"
                value={name}
                placeholder="Patient Name"
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
            <TableCell align="right">Recieved</TableCell>
            <TableCell align="right">Total </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.referenceNumber}
              </TableCell>
              <TableCell align="right">
                {new Date(row?.createdDatetimeStamp).toLocaleString()}
              </TableCell>
              <TableCell align="right">{row?.discountBy}</TableCell>
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