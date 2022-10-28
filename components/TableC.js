import { IconButton } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import ErrorIcon from '@mui/icons-material/Error';
import styles from "../styles/Home.module.css";

export default function TableC({data}) {
  return (
    <div>
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
                        // data
                        // .filter((data) => {
                        //     // if(new Date(filledStart).toLocaleDateString() === 'from'&& dayjs(new Date(data.createdDatetimeStamp).toLocaleDateString()).isSameOrAfter(new Date(filledStart).toLocaleDateString())){
                        //     //     return data

                        //     // }
                        //     const customerName=`${data.customerDetails?.name}`
                        //     // const customerPhone=`${data.customerDetails?.phone}`
                        //     if (phone == '' && name == '') {
                        //         return data
                        //     }

                        //     // else if (data.patientName?.first === name) {
                        //     //     return data

                        //     // }
                        //     else if (customerName === name) {


                        //         return data

                        //     }



                        //     else if (data.patientPhone === phone) {
                        //         return data
                        //     }
                        // })
                        data.map(data =>
                            <div key={data._id} className={styles.showContainer} >

                                <div className={styles.showFiled}>
                                    <h3 className={styles.show}>{new Date(data.createdDatetimeStamp).toLocaleDateString()}</h3>
                                    <h3 className={styles.show}>{data.serial}</h3>
                                    {/* <h3 className={styles.show} >{data.modificationHistory.map(d => <div key={d.itemId}>
                                    <h4 >{d.userSerial}</h4>
                                </div>)}</h3> */}
                                    <h3>{data.data.map(d => <div key={d.itemId}>
                                        <h4 className={styles.showCategory}>{d.category}</h4>
                                    </div>)}</h3>

                                    <input className={styles.showN} type={'text'} value={data.customerDetails?.name} readOnly disabled></input>
                                    {/* <input className={styles.showN} type={'text'} value={data.patientName?.first } readOnly disabled></input> */}

                                    <input className={styles.showN} type={'text'} value={data.customerDetails?.phone} readOnly disabled></input>
                                    <h3 className={styles.show}>{data.totalBilled}</h3>
                                    <h3 className={styles.show}>{data.totalAmountPaid}</h3>
                                    <h3 className={styles.show}>{0}</h3>
                                    <h3 className={styles.show}>
                                        <IconButton aria-label="delete" onClick={() => route.push('/newExpenseItem')} >
                                            <EditIcon />
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
    </div>
  )
}
