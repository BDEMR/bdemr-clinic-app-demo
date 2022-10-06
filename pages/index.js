import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, OutlinedInput, Select, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { useState } from 'react';





export default function Home() {


  const [search, setSearch] = useState('')
  const [amount, setAmount] = useState('')
  const [qun, setQun] = useState('')
  const [items, setItems] = useState([])
  const [discounts,setDiscounts] = useState('')
  const [sum,setSum] = useState()


  const handelSearch = (e) => {
    setSearch(e.target.value);

  }



  const handelAmount = (e) => {
    setAmount(e.target.value)
    setQun(1)
  }


  const handelAddItem = (e) => {

    setItems(allItem)

  }



  const allItem = [

    {

      "search": { search },
      "amount": { amount },
      "key": 1,
      "quantity": { qun },
      "total": '1',


    }


  ]



  const add = () => {
    
      const q = qun + 2;
      setQun(q)
      handelAddItem()
    
  }
  const sub = () =>{
    const q = qun - 1;
    setQun(q)
    handelAddItem()
  }

  const totalBill = qun* amount;


  const handelDiscount = (e) =>{
    const dis = (e.target.value);
    const totalBill = qun* amount;
   const di = totalBill - parseInt(dis)
   if(totalBill == dis){
    setDiscounts(0);
   }
   else{
    setDiscounts(di);
   }
   
    
  }



  const handelVat = (e) =>{
    const vat = e.target.value;
    if(discounts){
      const finalvalue =discounts + (vat * 0.01 * discounts) ;
      setDiscounts(finalvalue)
    }
    else{
      const finalvalue = totalBill + (vat * 0.01 * totalBill)
      setDiscounts(finalvalue)
    }
  }





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
                <TextField onChange={handelSearch} sx={{ m: 1, width: 700 }} fullWidth label="Search item" id="fullWidth" variant="filled" />
              </div>

              <div className={styles.sel}>


                <TextField onChange={handelAmount} sx={{ m: 1, width: 700 }} fullWidth label="0" id="fullWidth" variant="filled" />
              </div>

            </div>

          </div>

        </div>

        <div className={styles.addbtn}>
          <Button onClick={handelAddItem} variant="contained" size="small" >Add</Button>

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

        {
          items.map(item => <div key={item.key}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>{item.search.search}</TableCell>
                    <TableCell align="right">{item.search.search}</TableCell>
                    <TableCell align="right"><button onClick={add}>+</button>{item?.quantity.qun}<button onClick={sub}>-</button></TableCell>
                    <TableCell align="right">{item.amount.amount}</TableCell>
                    <TableCell align="right">{(item.amount.amount) * qun}</TableCell>
                    <TableCell align="right"><DeleteIcon></DeleteIcon></TableCell>

                  </TableRow>

                </TableHead>

              </Table>
            </TableContainer>


          </div>)
        }



        <h2>Gross</h2>
        <div className={styles.grossinput}>
          <p>Discount Amt.</p>
          <TextField onChange={handelDiscount} fullWidth label="0" id="fullWidth" variant="filled" />
        </div>
        <div className={styles.grossinput}>
          <p>VAT/TAX</p>
          <div>
            <div className={styles.parsent}>
              <p>%</p>
              <TextField onBlur={handelVat} fullWidth label="vat" id="fullWidth" variant="filled" />
            </div>

          </div>

        </div>

        <div className={styles.grossinput}>
          <h3>Total Billed </h3>
          <h3>{discounts ? discounts : totalBill} </h3>
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
