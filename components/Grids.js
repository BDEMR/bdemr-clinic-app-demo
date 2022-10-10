import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Grading } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function Grids({ data }) {
  const router = useRouter();
 // console.log(router)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {data?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {new Date(row?.createdDatetimeStamp).toLocaleString()}
              </TableCell>
              <TableCell align="right">{row?.invoiceType}</TableCell>
              <TableCell align="right">{row?.discountBy}</TableCell>
              <TableCell align="right">{row?.discount}</TableCell>
              <TableCell align="right">{row?.organizationName}</TableCell>
              <TableCell align="right">{row?.totalAmountReceieved}</TableCell>
              <TableCell align="right">{row?.totalBilled}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() =>
                    router.push({
                      pathname: "/about",
                      query: { pid: row?._id },
                    })
                  }
                >
                  <Grading />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
