
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import salaryManager from '../salaryManager'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from "../styles/Home.module.css";
import ViewSalarySheet from './ViewSalarySheet';



export default function HOME() {

  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [field, setField] = useState('')
  const [items, setItems] = useState([])

  const route = useRouter();
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setField(start)
    setOpen(false);
    const filterData = salaryManager.filter(da => da.createdDatetimeStamp === '10 Jan 2022 ,12:47 pm');
    setItems(filterData);
  };


  console.log(start)
  console.log(end)
  console.log(items)

  
  
  const handelAddNew = () =>{
    route.push("/test")
  }
  const handleStartDate = (e) => {
    setStart(e.target.value)
    //console.log(e.target.value)
  }
  const handleEndDate = (e) => {
    setEnd(e.target.value)
    //console.log(e.target.value)
  }
  const handelNewTime = (e) => {
    setField('')
  }

  
  useEffect(() => {
  localStorage.setItem('list', JSON.stringify(items))

    
  }, [items]);





  return (
    <div>
      <section>

        <div className={styles.header}>
          <div>

            <Button onClick={handleClickOpen} variant="contained" sx={{ backgroundColor: 'whitesmoke', color: 'black' }}>
              {field ? <div>{start + '   ' + end}</div> : "Click to filter my date"}
            </Button>
            <button onClick={handelNewTime}>x</button>
          </div>
          <div>
            <Button variant="contained" onClick={handelAddNew}>ADD NEW EXPENSE ITEM</Button>
          </div>
        </div>



        <div>
          <div className={styles.tableContainer}>
            <div >Data</div>

            <div >Total</div>
            <div >Aation</div>

          </div>
        </div>

        {
          salaryManager.map(salar => <div key={salar._id}>

            <div className={styles.tableContainer}>
              <div>{ salar.createdDatetimeStamp}</div>
              

              <div >{salar.totalSalaryExpense}</div>
              
              <div ><ContentCopyIcon onClick={() => route.push("/accounts-salary-creator")}/> <VisibilityIcon onClick={() => route.push("/view-salary-sheet")}/></div>

            </div>

          </div>)
        }







      </section>
      <section>
        {/* date section --------------------------------- */}
        
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Filter By
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className={styles.startDate}>
              <label >Choose Start Date</label> <br></br>
              <input onChange={handleStartDate} className={styles.date} type={'date'}></input>
            </div>
            <div className={styles.startDate}>
              <label >Choose End Date</label> <br></br>
              <input onChange={handleEndDate} className={styles.date} type={'date'}></input>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button disabled={!(start && end)}  onClick={handleClose} autoFocus>
          FILTER
          </Button>
        </DialogActions>
      </Dialog>
       
      </section>


      <section>

      </section>

    </div>
  )
}


