import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from 'react';
import styles from "../styles/Home.module.css";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




export default function NewExpanseItems() {

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [qty, setQty] = useState(0)
    const [buyingPrice, setBuyingPrice] = useState('')
    const [items, setItems] = useState([])
    const [sellingPrice, setSellingPrice] = useState('')
    const [singleItem, setSingleItem] = useState([])
    const [discounted, setDiscounted] = useState();
    const [disco, setDisco] = useState();
    const [vat, setVat] = useState();
    const [paid, setPaid] = useState('');
    const [total, setTotal] = useState('');
    const [totalBilled, setTotalBilled] = useState('');
    const [name, setName] = useState('');
    const [phone, setaPhone] = useState('');
    const [address, setaAddress] = useState('');
    const [id, setId] = useState('')
    const [allTotal, setAllTotal] = useState('')
    const [value, setValue] = useState(null);

    // const increase = (id) => {
    //     setId(id);
    //     console.log(id);
    //     const sum = parseInt(qty) + 1
    //     setQty(sum)


    // }
    // const decrease = () => {
    //     // const up = parseInt(qty)+ 1;
    //     // setQty(up)

    // }
    const handleQtyInput = (event) => {
        const qtyInput = event.target.value
        if (qtyInput >= 0) {
            setQty(qtyInput)
        }

    }

    const handleSearchItem = (event) => {
        setSearch(event.target.value)


    }
    const discount = (e) => {

        const dis = (e.target.value)
        setDisco(dis)

        const d = parseInt(allTotal) - parseInt(dis)
        setDiscounted(d)

    }


    const handleCategory = (event) => {
        setCategory(event.target.value)


    }
    const handleQty = (event) => {
        setQty(event?.target.value)

    }
    const handleBuyingPrice = (event) => {
        setBuyingPrice(event.target.value)

    }
    const handleSellingPrice = (event) => {
        setSellingPrice(event.target.value)

    }

    const handlePaid = (e) => {
        setPaid(e.target.value)

    }
    const handleVat = (event) => {
        const vat = event.target.value
        setVat(vat)
        if (discounted) {
            const subtotal = (vat * 0.01 * discounted) + discounted;
            setDiscounted(subtotal);
        }
        else {
            const subtotal = ((vat * 0.01 * allTotal) + allTotal)
            setDiscounted(subtotal);
        }



    }

    const totalBill = () => {
        const totalBl = buyingPrice * qty
        setTotalBilled(totalBl)

    }

    const handlePhone = (event) => {
        setaPhone(event.target.value)
    }

    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleAddress = (event) => {
        setaAddress(event.target.value)
    }


    const changeQty = () => {
        // handleQty()
    }

    const expense = {
        serial: Math.random() * 100,
        // recordCreatedDateTimeStamp: lib.datetime.now(),
        // createdDatetimeStamp: lib.datetime.now(),
        // createdByUserSerial: this.user.serial,
        // organizationId: this.organization.idOnServer,
        modificationHistory: [],
        lastModifiedDatetimeStamp: null,
        invoiceType: "expense",
        item_search: search,
        category: category,
        quantity: qty,
        buyingPrice: buyingPrice,
        totalBilled: totalBilled,
        discount: disco,
        vatOrTax: vat,
        previouseDue: 0,
        availableBalance: 0,
        totalAmountPaid: paid,
        flags: {
            flagAsError: false,
            markAsCompleted: false,
        },
        data: [
            {
                item_search: search,
                category: category,
                quantity: qty,
                buyingPrice: buyingPrice,
            }
        ],
        vendorDetails: {
            name: name,
            phone: phone,
            address: address,
        },
    }

    const item =
    {
        "key": Math.random() * 100,
        "phone": phone,
        "name": name,
        "address": address,
        // "name":name,
        "search": search,
        "category": category,
        "qty": qty,
        "buyingPrice": buyingPrice,
        "sellingPrice": sellingPrice,
        "discount": disco,
        "paid": paid,
        "vat/tx": vat,
        "totalBilled": totalBilled,


    }


    const handleAdd = async () => {
        setItems((oldItems) => {
            totalBill()
            const more = buyingPrice * qty + totalBilled
            setAllTotal(more)
            return [...oldItems, expense]

        })

    }

    const ta = (event) => {
        console.log(htmlFor)

    }




    const handleFormSubmit = (event) => {
        event.preventDefault()
        console.log(items)
        // console.log(phone,name,address)


    }



    return (
        <form onSubmit={handleFormSubmit}>
            <div className={styles.input_container}>

                <section >


                    <h1 className={styles.vendorText}>Billed to:{item?.search?.search}</h1>

                    <div className={styles.hr}></div>

                    <div className={styles.billedField}>
                        <TextField onChange={handleName} variant="filled" className={styles.input_field} fullWidth label="Name" id="fullWidth" />

                        <TextField onChange={handlePhone} variant="filled" className={styles.input_field} fullWidth label="Phone Number" id="fullWidth" />
                    </div>

                    <TextField onChange={handleAddress} variant="filled" className={styles.input_field} fullWidth label="Address" id="fullWidth" />

                </section>
                <section>
                    <h1 className={styles.vendorText}>Items</h1>

                </section>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell> <TextField onChange={handleSearchItem} variant="filled" fullWidth
                                    // value={item.itemName}
                                    label='Search Item'
                                    id="fullWidth" /></TableCell>
                                <TableCell align="right"><TextField onChange={handleCategory} variant="filled" fullWidth label="Category" id="fullWidth" /></TableCell>
                                <TableCell align="right"><TextField onChange={handleQty} fullWidth label="Qty" id="fullWidth" variant="filled" /></TableCell>
                                <TableCell align="right"><TextField onChange={handleBuyingPrice} fullWidth id="fullWidth" variant="filled" label="Buying Price" /></TableCell>
                                <TableCell align="right"><Button onClick={handleAdd} variant="contained">ADD</Button></TableCell>

                            </TableRow>
                        </TableHead>

                    </Table>
                </TableContainer>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell> Item Name</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Qty</TableCell>
                                <TableCell align="right">Buying Price</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items?.map((item) => (
                                <TableRow
                                    key={item?.serial}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item?.item_search}
                                    </TableCell>
                                    <TableCell align="right">{item?.category}</TableCell>
                                    <TableCell align="right"><input onChange={handleQtyInput} type="number" name="" id="" onClick={changeQty} value={item?.quantity} /></TableCell>
                                    <TableCell align="right">{item?.buyingPrice}</TableCell>
                                    <TableCell align="right">{item?.buyingPrice * item?.quantity}</TableCell>
                                    <TableCell align="right"><DeleteIcon sx={{ color: 'green' }} /></TableCell>
                                </TableRow>
                            ))}



                        </TableBody>
                    </Table>
                </TableContainer>

                <section>



                    <h3 className={styles.Gross}>Gross</h3>
                    <div className={styles.discount}>
                        <small>Discount </small>
                        <TextField onChange={discount} variant="filled"

                            className={styles.input_field} fullWidth

                            id="fullWidth" />
                    </div>
                    <div className={styles.discount}>
                        <div>
                            <small>VAT/TAX</small>
                        </div>
                        <div className={styles.VAT_TAX}>
                            <p>%</p>
                            <TextField onBlur={handleVat} variant="filled" className={styles.input_field} fullWidth label="" id="fullWidth" />
                            <p>0</p>
                        </div>
                    </div>
                    <div className={styles.discount}>
                        <h3>Total Billed</h3>

                        <h3>{discounted ?
                            discounted : allTotal
                        }</h3>


                    </div>
                    <div className={styles.discount}>
                        <small>Paid</small>
                        <TextField onChange={handlePaid} variant="filled" className={styles.input_field} fullWidth label="0" id="fullWidth" />
                    </div>
                    <div className={styles.discount}>
                        <small>Due</small>
                        <small className={styles.Previous_Due}>{
                            discounted ?
                                discounted - paid : totalBilled - paid
                        }</small>
                    </div>
                    <div className={styles.discount}>
                        <small>Adjustable Due</small>
                        <small className={styles.Adjustable_Due} >0 BDT</small>
                    </div>
                    <div className={styles.discount}>
                        <small>Previous Due</small>
                        <small className={styles.Previous_Due}>0 BDT</small>
                    </div>
                    <div className={styles.discount}>
                        <small>Adjust Due</small>
                        <TextField variant="filled" className={styles.input_field} fullWidth label="0" id="fullWidth" />
                    </div>
                    <div className={styles.discount}>
                        <small>Next Payment Date</small>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Basic example"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}>

                                </DatePicker>
                            </LocalizationProvider>
                        
                    </div>
                </section>

                <div className={styles.Submit}>

                    <div >
                        <input disabled type="submit" value="Cancel Date" />

                    </div>
                    <div>

                        <input disabled type="submit" value="Cancel" />
                        <input className={styles.formSubmit} type="submit" value="SELL" />
                        <input disabled className={styles.formPRINT} type="submit" value="SELL + PRINT PREVIEW" />
                    </div>
                </div>

            </div>


        </form>

    );
}


