import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "../styles/test.module.css";
import { Button } from 'react-day-picker';

const AccountsSalaryCreator = () => {
  return (
    <div>
      <section>
        <div className={styles.tableContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Employee Id</TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell >Mobile</TableCell>
                  <TableCell >Designation</TableCell>
                  <TableCell >Department</TableCell>
                  <TableCell >Action</TableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
            </Table>
          </TableContainer>




        </div>

      </section>
      <section className={styles.secTable}>
        <div className={styles.tableContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Employee Id</TableCell>

                  <TableCell >Employee Name</TableCell>
                  <TableCell >Basic Salary</TableCell>
                  <TableCell >Unit</TableCell>
                  <TableCell >Total Days Worked </TableCell>
                 
                  <TableCell >Overtime/Unit</TableCell>

                  <TableCell>Unit</TableCell>
                  <TableCell >Total Bonus</TableCell>

                  <TableCell >House Rent</TableCell>

                  <TableCell >Conveyance</TableCell>

                  <TableCell >Medical Allowance</TableCell>

                  <TableCell >Education</TableCell>
                  <TableCell>LFC</TableCell>

                  <TableCell >Dues Paid</TableCell>

                  <TableCell >Advance Taken</TableCell>

                  <TableCell >Tax Deduction</TableCell>

                  <TableCell >Insurance</TableCell>
                  <TableCell >Provident Fund</TableCell>

                  <TableCell >Gratuity</TableCell>
                  <TableCell >Advance Deduction</TableCell>

                  <TableCell >Net Salary</TableCell>

                  <TableCell >Paid</TableCell>


                </TableRow>
              </TableHead>
              {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
            </Table>
          </TableContainer>




        </div>
      </section>

      <section>
        <div className={styles.tableContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell ><h1 >Total Salary Expense</h1></TableCell>
                  <TableCell ><h1>0</h1></TableCell>

                </TableRow>
              </TableHead>
              {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
            </Table>
          </TableContainer>




        </div>
      </section>

      <section>
        <div>
        {/* <Button variant="contained">Contained</Button>

        <Button variant="outlined">Outlined</Button> */}

        </div>
        
      </section>
    </div>
  )
}

export default AccountsSalaryCreator