
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useRouter } from 'next/router';
import * as dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
//import salaryManager from '../salaryManager'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DatePicker } from '@mantine/dates';
import styles from "../styles/Home.module.css";
import call_Api from '../pages/api/call_Api';
import ViewSalarySheet from './ViewSalarySheet';
import { ContactlessOutlined } from '@mui/icons-material';



export default function HOME() {

  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [field, setField] = useState('')
  const [items, setItems] = useState([])
  const [salaryManager,setApi] = useState([])


   console.log(salaryManager);

  const route = useRouter();

  const [open, setOpen] = React.useState(false);
  const startDate= dayjs(start).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
 const endDate= dayjs(end).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setField(start)
    setOpen(false);
    _loadDataFromApi(startDate,endDate)
    // salaryManager.slice(0,1).map((item) =>{
    //  return setApi([item])
       //console.log("item",salaryManager);
   // })
  

  };


  console.log(start)
  console.log("mill",new Date(start).getTime())
  console.log(end)
  console.log("mill",new Date(end).getTime())







  const handelAddNew = () => {
    route.push("/test")
  }
  // const handleStartDate = (e) => {
  //   setStart(e.target.value)
  //   //console.log(e.target.value)
  // }
  // const handleEndDate = (e) => {
  //   setEnd(e.target.value)
  //   //console.log(e.target.value)
  // }
  const handelNewTime = (e) => {
    setField('')
  }


  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(items))


  }, [items]);

// api call 

 

    const _loadDataFromApi = async (startDate, endDate) => {

     

        const query = {
          apiKey: "TjUyL4myCxziIBpegdz6Vw1axhtFgvDpmVvRtgOYKQxAecrdfw8an3RzgeNIL3m5dtdZbs00FuBWBgqoxps58BBFfq95TrVmylTeKLTFBC1sh15U72VgufBiRnUSBHEE"
          , // all the api call must needed an apikey
          organizationId: "5e3119c4e25dc07ca96ae0f1", // may not be requires for all api call
          //   other query data :
          searchParameters: {
            dateCreatedFrom:startDate,//"2020-02-15T18:00:00.000Z"
            dateCreatedTo: endDate,//"2022-10-13T17:59:59.999Z"
          },
        };
      //   setLoading(true); // loading starts
      console.log(query)
        try {
          // call_Api is a function that takes an endpoint and query data
          const incomeListResponse = await call_Api(
            "bdemr-organization-get-all-salary-sheet", //end point of api
            query // query data
          );
          console.log("incomeListResponse:", incomeListResponse);
          if (incomeListResponse.data.hasError) {
            console.log(incomeListResponse?.data?.error?.message); // handleError is/can bea function that handles erros
            return console.log(
              "incomeListResponse.data.error.message:",
              incomeListResponse.data.error.message
            );
          } else {
            setApi(incomeListResponse?.data?.data); // set the data in a state
          }
        } catch (err) {
          // handle or catch error
          console.log("Error:", err.message);
          console.log(err.message);
        }
      //   setLoading(false); // done with api calling now loading stops
      };


// api end 



  return (
    <div>
    <section>
      <button onClick={()=>_loadDataFromApi(startDate,endDate)}>Test </button>
    </section>
      <section>

        <div className={styles.header}>
          <div>

            <Button onClick={handleClickOpen} variant="contained" sx={{ backgroundColor: 'whitesmoke', color: 'black' }}>
              {field ? <div>{new Date(start).toLocaleDateString() + '   ' + new Date(end).toLocaleDateString()}</div> : "Click to filter my date"}
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


        {/* <div>
        {
          salaryManager.map(salar => <div key={salar._id}>

            <div className={styles.tableContainer}>
              <div>{new Date(salar.createdDatetimeStamp).toLocaleDateString()}</div>


              <div >{salar.totalSalaryExpense}</div>

              <div ><ContentCopyIcon onClick={() => route.push("/accounts-salary-creator")} /> <VisibilityIcon onClick={() => route.push("/view-salary-sheet")} /></div>

            </div>

          </div>)
        }

        </div> */}

        {
          salaryManager.map(salar => <div key={salar._id}>

            <div className={styles.tableContainer}>
              <div>{new Date(salar.createdDatetimeStamp).toLocaleDateString()}</div>


              <div >{salar.totalSalaryExpense}</div>

              <div ><ContentCopyIcon onClick={() => route.push("/accounts-salary-creator")} /> <VisibilityIcon onClick={() => route.push("/view-salary-sheet")} /></div>

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
              {/* <div className={styles.startDate}>
              <label >Choose Start Date</label> <br></br>
              <input onChange={handleStartDate} className={styles.date} type={'date'}></input>
            </div>
            <div className={styles.startDate}>
              <label >Choose End Date</label> <br></br>
              <input onChange={handleEndDate} className={styles.date} type={'date'}></input>
            </div> */}
            <div className={styles.calender}>
            <DatePicker placeholder="Choose Start Date" value={start} onChange={setStart} />
              <DatePicker placeholder="Choose End Date" value={end} onChange={setEnd} />
            </div>

              
             


            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button disabled={!(start && end)} onClick={handleClose} autoFocus>
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


