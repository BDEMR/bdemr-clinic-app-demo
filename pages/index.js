import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, OutlinedInput, Select, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import Paper from '@mui/material/Paper';





export default function Home() {




  const router = useRouter();
  return (
    <div className={styles.container}>
      <section >
        <TextField fullWidth label="Phone Number" id="fullWidth" variant="filled" />
        <div className={styles.field}>
          <p className={styles.text}>No Phone Number?</p>

          <Button variant="contained" size="small" >Generate Number</Button>

        </div>

        <div className={styles.secinput}>
          <TextField fullWidth label="Name" id="fullWidth" variant="filled" />
        </div>
        <div className={styles.secinput}>
          <TextField fullWidth label="Address" id="fullWidth" variant="filled" />
        </div>

        <div className={styles.secinput}>
          <Button variant="outlined">OPENNING BALANCE</Button>
        </div>

        <div>

          <Button variant="contained" size="small" >REGISTER CUSTOMER</Button>
        </div>
      </section>


      <section>
        <h2>Items</h2>
        <hr />
        <div>
          <div className={styles.s}>

          <div className={styles.y}>
            <div>

            </div>
            <div>
         <p>Selling Price</p>
            </div>

            

          </div>

          <div className={styles.selector}>
            <div >
              <FormControl sx={{ m: 1, width: 500 }}>
                <InputLabel id="demo-multiple-chip-label">Search item</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple

                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                >

                </Select>
              </FormControl>
            </div>

            <div className={styles.sel}>

              
              <TextField sx={{ m: 1, width: 700 }} fullWidth label="0" id="fullWidth" variant="filled" />
            </div>

          </div>
          </div>

        </div>
        <div className={styles.addbtn}>
        <Button variant="contained" size="small" >Add</Button>

        </div>
        

      </section>

      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Qty </TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>

              </TableRow>
            </TableHead>

          </Table>
        </TableContainer>
        <h2>Gross</h2>
        <div className={styles.grossinput}>
          <p>Discount Amt.</p>
          <TextField fullWidth label="0" id="fullWidth" variant="filled" />
        </div>
        <div className={styles.grossinput}>
          <p>VAT/TAX</p>
          <div>
            <div className={styles.parsent}>
              <p>%</p>
              <TextField fullWidth label="Phone Number" id="fullWidth" variant="filled" />
            </div>

          </div>

        </div>

        <div className={styles.grossinput}>
          <h3>Total Billed </h3>
          <h3>0 </h3>
        </div>

        <div className={styles.grossinput}>
          <p>Received</p>
          <TextField fullWidth label="" id="fullWidth" variant="filled" />
        </div>
        <div className={styles.grossinput}>
          <p>Adjustable Due</p>
          <h3 className={styles.adjestment}>BDT</h3>
        </div>

        <div className={styles.grossinput}>
          <p >Previous Due</p>
          <h3 className={styles.previous}>BDT</h3>
        </div>

        <div className={styles.grossinput}>
          <p>Adjust Due </p>
          <TextField fullWidth label="" id="fullWidth" variant="filled" />
        </div>
        <div className={styles.grossinput}>
          <p>next payment date</p>
          {/* <TextField fullWidth label="Phone Number" id="fullWidth" variant="filled" /> */}
          <input type="date" name="select" id="" value='select' />
        </div>


      </section>

        <section>
        <div className={styles.selector}>
            <div >
              <FormControl sx={{ m: 1, width: 500 }}>
                <InputLabel id="demo-multiple-chip-label">Sell Via</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple

                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                >

                </Select>
              </FormControl>
            </div>

            

          </div>
        </section>

      <section >
        <FormGroup >
          <div className={styles.receive}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="receivable" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Send Sms" />

          </div>


        </FormGroup>
      </section>

    </div>
  );
}
