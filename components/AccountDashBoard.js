import { Alert, AlertTitle, AppBar, Button, Checkbox, CssBaseline, FormControlLabel, IconButton, Switch, Table, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from "../styles/Home.module.css";
import expense from '../expense'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router';


export default function HOME() {

    const [value, setValue] = React.useState(null);
    const [errorPopUp, setErrorPopUp] = React.useState(false)
    const [printOpen, setPrintOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [filled, setFilled] = useState('')
    const [data, setData] = useState([])
    const [fData, setFData] = useState([])
    const [filledStart, setFilledStart] = useState(null)
    const [filledEnd, setFilledEnd] = useState(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [userId, setUserId] = useState('')
    const [ve, setV] = useState('')
    const route=useRouter()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFilled(filledEnd)
        setOpen(false);
    };

    const handleError = () => {
        setErrorPopUp(true)
    }

    const handleErrorClose = () => {
        setErrorPopUp(false)
    }

    const handleCancel = () => {
        setPopUp(null)
    }
    const handleStartDate = (e) => {
        setFilledStart(e.target.value)

    }
    const handleEndDate = (e) => {
        setFilledEnd(e.target.value)

    }
    const handleX = (e) => {
        setFilled('')
        setFilledEnd('')

    }
    const handleSubmit = () => {
        setData(expense)
        const v = 5;
        setV(v)
    }

    const handleName = (event) => {
        const { value } = event.target
        setName(value)

    }
    const handlePhone = (event) => {

        const { value } = event.target
        setPhone(value)

    }
    const handlePrintClose = () => {
        setPrintOpen(false);
    };

    const handlePrint = (id) => {
        setPrintOpen(true);
        setUserId(id)

    }

    const componentRef = useRef();
    const handlePrintIcon = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onafterprint: () => alert('print success')
    })

    console.log(phone)

    return (
        <div>
            <section>

                <div className={styles.checkboxContainer}>
                    <div className={styles.searchField}>
                        <div className={styles.searchField}>
                            <Button onClick={handleClickOpen} variant="contained" sx={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                                {filled ? <div>{filledStart + '-----' + filledEnd}</div> : 'Click to filter my date'}
                            </Button>
                            <button className={styles.X} onClick={handleX}>{filled ? 'X' : null}</button>
                            <FormControlLabel control={<Switch defaultChecked />} label="include Errors" />
                            <FormControlLabel control={<Checkbox color='success' sx={{ color: 'rgb(55, 172, 137)' }} defaultChecked />} label="Show Out Standing Dues" />
                            <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: 'rgb(55, 172, 137)', }}>
                                Search
                            </Button>
                           {
                            ve
                            ?  <Button  variant="contained" sx={{ backgroundColor: 'rgba(224, 160, 50, 0.731)', }}>
                            PRINT THE REPORT
                        </Button>
                        : null
                           }
                        </div>
                        <di>
                            <Button variant="contained" onClick={()=>route.push('/page-expense-invoice')}> <AddIcon></AddIcon>  ADD NEW EXPENSE ITEM</Button>

                        </di>
                    </div>

                </div>


                <div className={styles.showContainer} >
                    <div className={styles.showFiled}>
                        <h3 className={styles.show}>Data</h3>
                        <h3 className={styles.show}>Serial</h3>
                        <h3 className={styles.show}>Category</h3>
                        <div><input onChange={handleName} type={'text'} placeholder='name'></input></div>
                        <h3> <input onChange={handlePhone} type={'text'} placeholder='phone'></input></h3>
                        <h3 className={styles.show}>Billed</h3>
                        <h3 className={styles.show}>Paid</h3>
                        <h3 className={styles.show}>Due</h3>
                        <h3 className={styles.show}> Action</h3>

                    </div>
                </div>



                {
                    data.filter((data) => {
                        if (phone == '' && name == '') {
                            return data
                        }
                        else if (data.patientName?.first === name) {
                            return data

                        }

                        else if (data.patientPhone === phone) {
                            return data
                        }
                    }).map(data =>
                        <div key={data._id} className={styles.showContainer} >

                            <div className={styles.showFiled}>
                                <h3 className={styles.show}>{new Date(data.createdDatetimeStamp).toLocaleDateString()}</h3>
                                <h3 className={styles.show} >{data.modificationHistory.map(d => <div key={d.itemId}>
                                    <h4 >{d.userSerial}</h4>
                                </div>)}</h3>
                                <h3>{data.data.map(d => <div key={d.itemId}>
                                    <h4 className={styles.showCategory}>{d.category}</h4>
                                </div>)}</h3>

                                <input className={styles.showN} type={'text'} value={data.patientName?.first} readOnly disabled></input>

                                <input className={styles.showN} type={'text'} value={data.patientPhone} readOnly disabled></input>
                                <h3 className={styles.show}>{data.totalBilled}</h3>
                                <h3 className={styles.show}>{data.paid}</h3>
                                <h3 className={styles.show}>{data.totalBilled - data.paid}</h3>
                                <h3 className={styles.show}>
                                    <IconButton aria-label="delete"  onClick={()=>route.push('/page-expense-invoice')} >
                                        <EditIcon  />
                                    </IconButton>
                                    <IconButton aria-label="delete"   >
                                        <PrintIcon onClick={() => handlePrint(data._id)} />
                                    </IconButton>
                                    <IconButton aria-label="delete"   >
                                        <ErrorIcon color='error' onClick={handleError} />
                                    </IconButton>
                                </h3>

                            </div>
                        </div>)
                }

                {
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold' }}>
                            Filter By
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <div className={styles.startDate}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Choose Start Date"
                                            value={filledStart}
                                            onChange={(newValue) => {
                                                setFilledStart(new Date(newValue).toLocaleDateString());
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

                                    {/* <label >Choose Start Date</label> <br></br>
                                    <input onChange={handleStartDate} className={styles.date} type={'date'}></input> */}
                                </div>
                                <div className={styles.startDate}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Choose End Date"
                                            value={filledEnd}
                                            onChange={(newValue) => {
                                                setFilledEnd(new Date(newValue).toLocaleDateString());
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

                                    {/* <label >Choose End Date</label> <br></br>
                                    <input onChange={handleEndDate} className={styles.date} type={'date'}></input> */}
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} sx={{ color: 'rgba(4, 134, 117, 0.815)' }} >CANCEL</Button>
                            <Button variant="contained" onClick={handleClose} disabled={!(filledStart && filledEnd)} sx={{ backgroundColor: 'rgb(55, 172, 137)', }}>
                                FILTER
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
                {
                    <Dialog
                        open={errorPopUp}
                        onClose={handleErrorClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Do you want to Mark this Invoice as Error?
                        </DialogTitle>

                        <DialogActions>
                            <Button onClick={handleErrorClose} sx={{ color: 'rgba(4, 134, 117, 0.815)' }}>Cancel</Button>
                            <Button onClick={handleErrorClose} autoFocus sx={{ color: 'rgba(4, 134, 117, 0.815)', fontWeight: 'bold' }}>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                }


                {/* for print  */}

                <Dialog
                    fullScreen
                    open={printOpen}
                >
                    <AppBar sx={{ position: 'relative', backgroundColor: 'rgb(55, 172, 137)' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handlePrintClose}
                                aria-label="close"
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Accounts Expense Print Preview
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handlePrintIcon}>
                                <PrintIcon />
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent ref={componentRef}>
                        <p>{userId}</p>
                        <h3 style={{ textAlign: 'center' }}>Debit Voucher</h3>
                        <h1 style={{ borderBottom: '2px solid black' }}></h1>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>
                                <h5>Billed to: {'amrito'}</h5>
                                <h5>Phone: {'01317178969'}</h5>
                                <h5>Address: {'natore'}</h5>
                            </span>

                            <span >
                                <h5>Serial: {'c-0'}</h5>
                                <h5>Date: {'15 Jan 2021, 03:10 pm'}</h5>
                                <h5>Created By: {'Asif Alam'}</h5>
                            </span>
                        </div>
                        <h1 style={{ borderBottom: '2px solid black' }}></h1>
                        <div className={styles.tablePrint}>
                            <TableContainer sx={{ paddingRight: '20%' }}>
                                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell>Items </TableCell>
                                            <TableCell align="right">Category</TableCell>
                                            <TableCell align="right">Unit Price</TableCell>
                                            <TableCell align="right">Qty</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                        </TableRow>
                                    </TableHead>

                                </Table>
                            </TableContainer>

                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <h4>Total Discount:{'0'}BDT</h4>
                            <h4>Total Billed:{'0'}BDT</h4>
                            <h4>Total Receieved:{'0'}BDT</h4>
                            <h4>VAT/TAX::{'0'}BDT</h4>
                            <h4>Due:{'0'}BDT</h4>

                        </div>




                    </DialogContent>
                </Dialog>


            </section>




        </div>
    )
}
