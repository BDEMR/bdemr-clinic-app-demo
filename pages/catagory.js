import { Box, Button, CssBaseline, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from "../styles/Home.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';



export default function Home() {
    const [popUp, setPopUp] = useState(false)
    const [category, setCategory] = useState('')
    const [output, setOutput] = useState([])


    const handleInput = (e) => {
        setCategory(e.target.value)
    }
   
    const handleSubmit =()=>{
        setOutput((newValue)=>{
            return[...newValue,category]

        });
        setPopUp(false)
        
    }
    const handleCancel=()=>{
        setPopUp(null)
    }

    const handleDelete=(cat)=>{
        const deleteVal = [...output]
        deleteVal.splice(cat, 1)
        setOutput(deleteVal)
        console.log(cat)

    }

    return (
        <div className={styles.catagoryContainer}>
            <div className={styles.catagoryfield}>
                <h3 className={styles.catagoryHeader}>Commission Cattegory Manage</h3>
                <div className={styles.catagoryButtonDiv}>
                    <button onClick={() => setPopUp(true)} className={styles.catagoryButton}>ADD NEW CAGEGORY</button></div>
                    {
                popUp ? <div key={1}>
                    <div className={styles.popUpField}>
                        <h5 className={styles.popUpCancle}>New Category</h5>
                        <TextField onChange={handleInput} fullWidth label='Name of the catagory' id="fullWidth" required/>
                        <div >
                            <button className={styles.popUpSubmit} onClick={handleSubmit}>Submit</button>
                            <button className={styles.popUpCancle} onClick={handleCancel}>Cancle</button>
                        </div>
                    </div>
                </div> : null

            }

                <div className={styles.catagoryTable}>
                    <div className={styles.catagoryTableHeader}>
                        <small className={styles.catagoryTableHeaderName}>Name</small>
                        <small className={styles.catagoryTableHeaderAction}>Action</small>

                    </div>
                    { output.map(cat=> <div key={'1'} className={styles.catagoryTableRow}>
                        <small className={styles.catagoryTableHeaderName}>
                            <h5>{cat}</h5>
                        </small>
                        <small className={styles.catagoryTableHeaderAction}>
                            <button onClick={()=>handleDelete(cat)} className={styles.catagoryDelete}>DELETE CAGEGORY</button>
                        </small>

                    </div>)
                        
                    }
                </div>
            </div>
            
        </div>
    )
}