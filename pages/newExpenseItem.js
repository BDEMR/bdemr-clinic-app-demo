import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from 'react';
import styles from "../styles/Home.module.css";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';




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
                    <div className={styles.hr}></div>

                    <div className={styles.item_first_row}>
                        {/* first row  */}
                        <div className={styles.first_row_under_item}>
                            <div>  <small>Item Name</small> </div>
                            <div> <small>Category</small></div>
                            <div><small> Qty</small></div>
                            <div> <small> Unit Price</small></div>
                            
                        </div>

                        {/* second row  */}
                        <div className={styles.second_row_under_item}>
                            <div >
                                <TextField onChange={handleSearchItem} variant="filled" fullWidth
                                    // value={item.itemName}
                                    label='Search Item'
                                    id="fullWidth" />
                            </div>
                            <div>
                                <TextField onChange={handleCategory} variant="filled" fullWidth label="Category" id="fullWidth" />
                            </div>
                            <div><TextField onChange={handleQty} fullWidth label="1" id="fullWidth" variant="filled" /></div>
                            <div><TextField onChange={handleBuyingPrice} fullWidth id="fullWidth" variant="filled" /></div>
                           
                            <div className={styles.itemsADD_button}>
                        <Button onClick={handleAdd} variant="contained">ADD</Button>
                    </div>
                        </div>

                    </div>
                    {/* <TextField variant="filled" className={styles.input_field} fullWidth label="Batch Number" id="fullWidth" />


                    <div className={styles.date_input}><label htmlFor="Batch">Manufacture Date</label> <input type="date" name="Batch" id="Batch" /></div>


                    <div className={styles.date_input}><label htmlFor="Expire Date">Expire Date/Valid Until</label> <input type="date" name="Expire Date" id="Expire Date" /></div>

                    <div className={styles.ADD_button}>
                        <Button onClick={handleAdd} variant="contained">ADD</Button>
                    </div> */}

                </section>

                <section>
                    <div className={styles.table}>
                        <small>Item Name</small>
                        <small>Category</small>
                        <small>Qty</small>
                        <small>Buying Price</small>
                        <small>Total</small>
                        <small>Action</small>
                    </div>
                    {
                        items?.map(item => <div className={styles.table} key={item?.serial}>
                            <small>{item?.item_search}</small>
                            <small>{item?.category}</small>
                            <small><input className={styles.qtyInputFiled} onChange={handleQtyInput} type="number" name="" id="" onClick={changeQty} value={item?.quantity} /></small>

                            {/* <small className={styles.qtyBar}><button onClick={decrease} className={styles.positiveButton}>-</button> <input className={styles.qtyInputFiled} onChange={handleQtyInput} type="text" name="" id="" value={item?.qty} /> <button onClick={() => increase(item?.key)} className={styles.positiveButton}>+</button></small> */}

                            <small>{item?.buyingPrice}</small>
                            <small id='ta'>{item?.buyingPrice * item?.quantity} </small>
                            <small> <DeleteIcon sx={{ color: 'green' }} /></small>



                        </div>)
                    }


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
                        <div className={styles.date_input}><label htmlFor="Select" >Select Date</label> <input type="date" name="Select" id="Select" /></div>
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


