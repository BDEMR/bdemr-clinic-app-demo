import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useState } from "react";
import styles from "../styles/Home.module.css";


export default function AdmissionPage() {

    const datasub = (e) => {
        e.preventDefault()
        const admit = e.target.admiit.value;
        console.log(admit)
    }

    return (
        < >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            ></Box>

            <form onSubmit={datasub}>


                <div className={styles.formContainer}>

                    <div className={styles.form}>
                        <label>Reg No:<TextField id="standard-basic" variant="standard" /></label>
                        <label>Admission Date: <input id="date" className={styles.date} type="date" /></label>
                        <label> Disgreate Date: <input id="date" className={styles.date} type="date" /></label>
                    </div>
                    <div className={styles.formt}>
                        <span> <label>Word/Cabin No:<TextField id="standard-basic" variant="standard" /></label></span>
                        <span className={styles.for}><label>Bed No:<TextField id="standard-basic" variant="standard" /></label></span>
                        <span> <label>Diet:<TextField id="standard-basic" variant="standard" /></label></span>

                    </div>
                    <div className={styles.form}>
                        <label>Patients Name:<TextField id="standard-basic" variant="standard" /></label>
                        <label>Age:<TextField id="standard-basic" variant="standard" /></label>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />

                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className={styles.formRelative}  >
                        <label >Nearest Relative:<TextField className={styles.formLine} id="standard-basic" variant="standard" /></label>
                        <label>  Mobile No:<TextField className={styles.formLine} id="standard-basic" variant="standard" /></label>

                    </div>
                    <div className={styles.formRelative}  >
                        <label >Village:<TextField className={styles.formLine} id="standard-basic" variant="standard" /></label>
                        <label> Post:<TextField className={styles.formLine} id="standard-basic" variant="standard" /></label>

                    </div>
                    <div className={styles.formRelative}  >
                        <label >P.S/ Union:<TextField className={styles.formLine} id="standard-basic" variant="standard" /></label>
                        <label>  District:<TextField className={styles.formLine} id="standard-basic" variant="standard" /></label>

                    </div>




                </div>

                <div className={styles.formContainer}>
                    <h1 className={styles.formTitle}>Doctors Addmission Note</h1>
                    <div className={styles.addmissionNote}>

                        <div>
                            <TextField
                                id="standard-multiline-static"
                                className={styles.formText}
                                multiline
                                rows={4}
                                defaultValue="History"
                                variant="standard"

                            />


                        </div>
                        <div className={styles.physican}>
                            <p>Physican Examination</p>

                            <label>Height:<TextField id="standard-basic" variant="standard"

                            />cm</label>


                            <label>Weight:<TextField id="standard-basic" variant="standard" />kg</label>


                            <label>B.P:<TextField id="standard-basic" variant="standard" />MMO/Hg</label>


                            <label>Pulse:<TextField id="standard-basic" variant="standard" />Min</label>


                            <label>Category:<TextField id="standard-basic" variant="standard" /></label>

                        </div>
                        <div>
                            <TextField
                                id="standard-multiline-static"
                                className={styles.formText}
                                multiline
                                rows={4}
                                defaultValue="Laboratory"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-multiline-static"
                                className={styles.formText}
                                multiline
                                rows={4}
                                defaultValue="X-ray/ECG/Ultrasonud"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-multiline-static"
                                className={styles.formText}
                                multiline
                                rows={4}
                                defaultValue="Assesment"
                                variant="standard"

                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-multiline-static"
                                className={styles.formText}
                                multiline
                                rows={4}
                                defaultValue="Plan"
                                variant="standard"
                            />
                        </div>

                    </div>

                    <div className={styles.buttonSubmit}  >

                        <label className={styles.addmitted}  >Admitted physical: <TextField id="standard-basic" name='admiit' variant="standard" /></label>

                        <Button type='submit' variant="contained">Add Info</Button>


                    </div>
                </div>


            </form>

        </>

    );
}

