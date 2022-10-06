import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from 'react';
import styles from "../styles/Home.module.css";
import { Button, FormControl, IconButton, InputLabel, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';




export default function Home() {

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [qty, setQty] = useState('')
    const [buyingPrice, setBuyingPrice] = useState('')
    const [items, setItems] = useState([])
    const [sellingPrice, setSellingPrice] = useState('')
    const [singleItem, setSingleItem] = useState([])
    const [discounted, setDiscounted] = useState();
    const [disco, setDisco] = useState();
    const [vat, setVat] = useState();
    const [paid, setPaid] = useState();
    const [a, setA] = useState('')
    const router = useRouter();




    const up = () => {
        handleAdd()
        const up = parseInt(qty) + 1;
       
        totalBill()
        setQty(up);
        


    }
    const down = () => {
        const up = parseInt(qty) - 1;
        setQty(up);
        handleAdd()
        // totalBill()

    }

    




    const item = [
        {
            "key": 1,
            "search": { search },
            "category": { category },
            "qty": { qty },
            "buyingPrice": { buyingPrice },
            "sellingPrice": { sellingPrice },

        }
    ]

    const totalBill = () => {
        const totalBl = buyingPrice * qty
        // handleAdd()
        console.log(totalBl)

    }


    const handleSearchItem = (event) => {
        setSearch(event.target.value)


    }
    const discount = (e) => {

        const dis = (e.target.value)
        setDisco(dis)
        const d = parseInt(totalBilled) - parseInt(dis)
        setDiscounted(d)

    }

   

    const handleCategory = (event) => {
        setCategory(event.target.value)


    }
    const handleQty = (event) => {
        setQty(event.target.value)

    }
    const handleBuyingPrice = (event) => {
        setBuyingPrice(event.target.value)

    }
    const handleSellingPrice = (event) => {
        setSellingPrice(event.target.value)

    }

    const handlePaid=(e)=>{
        setPaid(e.target.value)

    }
    const handleVat=(event)=>{
        const vat=event.target.value
        if(discounted){
            const subtotal=(vat * 0.01* discounted)+ discounted;
            setDiscounted(subtotal);
        }
        else{
            const subtotal=((vat * 0.01 * totalBilled) + totalBilled)
            setDiscounted(subtotal);
        }
        // const ta=discounted-tatalVat;
        // console.log(vat)
        // console.log(tatalVat)
        // console.log(ta)
        

    }
    const handleAdd = (event) => {
        // event.preventDefault()
        setItems(item)
        totalBill()
        console.log(items);



    }
  
    const totalBilled = buyingPrice * qty ;
   

    
        return (

            <div className={styles.input_container}>

                <section >


                    <h1 className={styles.vendorText}>Vendor Information:{item?.search?.search}</h1>

                    <div className={styles.hr}></div>

                    <TextField variant="filled" className={styles.input_field} fullWidth label="Phone Number" id="fullWidth" />

                    <div className={styles.GENERATE_NUMBER_Div}>
                        <div><p>No Phone Number?</p></div>
                        <div><Button className={styles.GENERATE_NUMBER_button} variant="contained">GENERATE NUMBER</Button></div>
                    </div>
                    <TextField variant="filled" className={styles.input_field} fullWidth label="Name" id="fullWidth" />
                    <TextField variant="filled" className={styles.input_field} fullWidth label="Address" id="fullWidth" />
                    <div>
                        <Button className={styles.OPENING_BALANCE_BUTTON} variant="outlined">OPENING BALANCE  &rarr;</Button>
                    </div>
                    <div><Button className={styles.REGISTER_VENDOR_BUTTON} variant="contained">REGISTER VENDOR</Button></div>



                </section>
                <section>
                    <h1 className={styles.vendorText}>Items</h1>
                    <div className={styles.hr}></div>

                    <div className={styles.item_first_row}>
                        {/* first row  */}
                        <div className={styles.first_row_under_item}>
                            <div>  <small>Item Name</small> </div>
                            <div> <small>Category</small></div>
                            <div><small>| Qty</small></div>
                            <div> <small>| Buying Price</small></div>
                            <div> <small>| selling price </small></div>
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
                            <div><TextField onChange={handleSellingPrice} fullWidth label="0" variant="filled" id="fullWidth" /></div>
                        </div>

                    </div>
                    <TextField variant="filled" className={styles.input_field} fullWidth label="Batch Number" id="fullWidth" />


                    <div className={styles.date_input}><label htmlFor="Batch">Manufacture Date</label> <input type="date" name="Batch" id="Batch" /></div>


                    <div className={styles.date_input}><label htmlFor="Expire Date">Expire Date/Valid Until</label> <input type="date" name="Expire Date" id="Expire Date" /></div>

                    <div className={styles.ADD_button}>
                        <Button onClick={handleAdd} variant="contained">ADD</Button>
                    </div>

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
                        items.map(item => <div className={styles.table} key={item.key}>
                            <small>{item.search.search}</small>
                            <small>{item.category.category}</small>
                            <small><button onClick={down}>-</button>{item.qty.qty} <button onClick={up}>+</button></small>
                            <small>{item.buyingPrice.buyingPrice}</small>
                            <small>{item.buyingPrice.buyingPrice * qty} </small>
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

                        <h3>{ discounted ?
                          discounted : totalBilled
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
                         discounted - paid : totalBilled -paid
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


            </div>
        );
}


