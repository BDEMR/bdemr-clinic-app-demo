import { Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import styles from "../styles/Home.module.css";
import Select from '@mui/material/Select';
import { Search } from '@mui/icons-material';
import { useState } from 'react';


const expense = () => {
    // const [search,setSearch]= useState('')
    
   
    return (
        <div className={styles.input_container}>
            <section >
                <h1 className={styles.vendorText}>Vendor Information</h1>

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
                        <TextField variant="filled"  fullWidth 
                        value={item.itemName}
                        id="fullWidth" />
                        </div>
                        <div>
                        <TextField variant="filled"  fullWidth label="Category" id="fullWidth" /> 
                        </div>
                        <div><TextField fullWidth label="1" id="fullWidth" variant="filled" /></div>
                        <div><TextField fullWidth id="fullWidth" variant="filled"/></div>
                        <div><TextField fullWidth label="0" variant="filled" id="fullWidth" /></div>
                    </div>

                </div>
                <TextField variant="filled" className={styles.input_field} fullWidth label="Batch Number" id="fullWidth" />


                <div className={styles.date_input}><label htmlFor="Batch">Manufacture Date</label> <input type="date" name="Batch" id="Batch" /></div>


                <div className={styles.date_input}><label htmlFor="Expire Date">Expire Date/Valid Until</label> <input type="date" name="Expire Date" id="Expire Date" /></div>

               <div className={styles.ADD_button}>
               <Button  variant="contained">ADD</Button>
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
                <h3 className={styles.Gross}>Gross</h3>
                <div className={styles.discount}>
                    <small>Discount</small>
                    <TextField variant="filled" className={styles.input_field} fullWidth label="0" id="fullWidth" />
                </div>
                <div className={styles.discount}>
                    <div>
                    <small>VAT/TAX</small>
                    </div>
                    <div  className={styles.VAT_TAX}>
                        <p>%</p>
                        <TextField variant="filled" className={styles.input_field} fullWidth label="" id="fullWidth" />
                       <p>0</p>
                    </div>
                </div>
                <div className={styles.discount}>
                    <h3>Total Billed</h3>
                    <h3>0</h3>
                </div>
                <div className={styles.discount}>
                    <small>Paid</small>
                    <TextField variant="filled" className={styles.input_field} fullWidth label="0" id="fullWidth" />
                </div>
                <div className={styles.discount}>
                    <small>Due</small>
                    <small  className={styles.Previous_Due}>0</small>
                </div>
                <div className={styles.discount}>
                    <small>Adjustable Due</small>
                    <small className={styles.Adjustable_Due} >0 BDT</small>
                </div>
                <div className={styles.discount}>
                    <small>Previous Due</small>
                    <small  className={styles.Previous_Due}>0 BDT</small>
                </div>
                <div className={styles.discount}>
                    <small>Adjust Due</small>
                    <TextField variant="filled" className={styles.input_field} fullWidth label="0" id="fullWidth" />
                </div>
                <div className={styles.discount}>
                    <small>Discount</small>
                    <div className={styles.date_input}><label htmlFor="Select" >Select Date</label> <input  type="date" name="Select" id="Select" /></div>
                </div>
            </section>
            

        </div>
    );
};

export default expense;