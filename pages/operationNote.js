import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import styles from "../styles/Home.module.css";


function operationNote() {
    return (
        <>
      
                <div className="container">
                    <div>
                        <h1 className="title">Astro pater er janno samotipatro</h1>
                        <label>AMi rogir  This is the  <TextField id="standard-basic" name='admiit' variant="standard" /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt suscipit corrupti exercitationem harum? Officiis pariatur nostrum voluptate nisi totam nam laboriosam rerum, similique culpa iusto vel quo cupiditate expedita atque quis aut odio illum accusantium veniam quia. Ipsum doloremque error molestias dolores, magnam deserunt consequatur! Doloremque optio possimus atque, ea quisquam voluptates quaerat? Animi quis est alias explicabo debitis numquam tenetur tempore iusto labore! Dicta facere voluptatem molestias nisi quibusdam impedit facilis praesentium rem a ipsam, reprehenderit provident! Maiores, aspernatur. Explicabo fugiat facilis necessitatibus suscipit, et veritatis itaque, perspiciatis, id dolorum facere commodi ab natus. Veniam quasi consequatur minima, ex odit, illo sit, rerum corrupti possimus fugit cum minus reiciendis laboriosam excepturi sequi. Accusantium corporis alias reprehenderit ad corrupti? Harum.</label>
                        <div className="operationName">
                            <label>Full Name:  <TextField id="standard-basic" name='admiit' variant="standard" /></label>  <label>Sign :  <TextField id="standard-basic" name='admiit' variant="standard" /></label>
                        </div>
                        <div className="operationName">
                            <label>Relation of Patient:<TextField id="standard-basic" variant="standard" /></label>


                            <label>Date:<input id="date" className={styles.date} type="date" /></label>

                        </div>
                    </div>

                    <div>

                    </div>
                </div >

                <div className="container">
                    <h1 className="title">Operation Note</h1>
                    <hr />
                    <div className="patientInfo">
                        <label >Patients Name:  <TextField id="standard-basic" variant="standard" /></label>
                        <label>Age:  <TextField id="standard-basic" variant="standard" /></label>
                        <label >Reg No:  <TextField id="standard-basic" variant="standard" /></label>
                    </div>

                    <div className="OperationTime">
                        <label>Operation/Delivery Date:<input id="date" className={styles.date} type="date" /> </label>
                        <label>Operation/Delivery  Time: <TextField id="standard-basic" variant="standard" /> </label>
                    </div>
                    <div className="operationInfo">
                        <label>Name of Operation:  <TextField className="operationFiled" id="standard-basic" variant="standard" /></label> <br />
                        <label>Indication:  <TextField className="operationFiled" id="standard-basic" variant="standard" /> </label> <br />
                        <label>Surgeon/Deliverd by:  <TextField className="operationFiled" id="standard-basic" variant="standard" /> </label> <br />
                        <label>Anesthesiologist:  <TextField className="operationFiled" id="standard-basic" variant="standard" /> </label> <br />

                        <label>Asst. Surgeon (1):  <TextField className="operationFiled" id="standard-basic" variant="standard" /> </label> <br />
                        <label>Asst. Surgeon (2): <TextField className="operationFiled" id="standard-basic" variant="standard" /> </label> <br />
                        <label>Type of anesthesia <TextField className="operationFiled" id="standard-basic" variant="standard" /> </label> <br />
                        <label>Any special Findings <TextField className="operationFiled" id="standard-basic" variant="standard" /> </label> <br />

                        <h1 className="title">BABY NOTE</h1>

                        <hr />
                        <div className="babyInfo">
                            <label>  Delivery Date:  <TextField id="standard-basic" variant="standard" /></label>
                            <label>  Time:  <TextField id="standard-basic" variant="standard" /></label>
                            <label>Birth Wt:  <TextField id="standard-basic" variant="standard" /></label>
                            <label>

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
                            </label>

                        </div>

                        <div className="mainScore">
                            <div>
                                <h5 className="apgarTitle">APGAR Score:</h5>
                            </div>
                            <div className="SubMainScore">
                                <label> At 1st Min:  <TextField id="standard-basic" className="scoreFiled" variant="standard" /></label>
                                <label>  & 5th Min:  <TextField id="standard-basic" className="scoreFiled" variant="standard" /></label>

                            </div>
                        </div>

                        <div className="doctorSign">
                            <label>Doctors sign& date </label>
                            <TextField id="standard-basic" variant="standard" />



                        </div>
                    </div>


                </div>

                <div className="container">
                    <h1 className="title">Janmo nintron podotio (ligiosion)</h1>

                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, modi commodi quas iure quis sunt, eius labore reprehenderit asperiores tempore magnam fugit. Quisquam voluptatum mollitia exercitationem expedita similique labore ad eveniet saepe hic nesciunt fuga tempore aspernatur maiores repudiandae, ducimus sed. Quasi itaque delectus fuga vitae autem repellendus eos aspernatur dolores, aut necessitatibus quidem veniam velit aliquam ex maiores odit veritatis similique! Eius amet repellendus iure molestiae numquam ut nihil unde culpa error doloribus qui debitis totam, nulla sed fugit velit tempore quod eos! Sapiente id aliquid velit reiciendis sunt voluptatum debitis libero nulla, praesentium laboriosam et, inventore ipsa laudantium repellat. Nobis molestias pariatur consequuntur dolores reprehenderit iusto, temporibus tenetur. Sed exercitationem, soluta quas animi rem fugiat temporibus veniam quod a expedita optio nam voluptates ab, quidem iure veritatis architecto minima necessitatibus id pariatur. Repudiandae repellendus veniam sint expedita, odit reprehenderit. Eveniet dolor eum, expedita similique consequatur corrupti ut eligendi assumenda laboriosam, quas esse provident repellendus fuga, minima fugiat suscipit doloremque molestias aliquam quidem aperiam. Sit nostrum molestiae recusandae tempora vero nam placeat cumque explicabo facilis. Assumenda deserunt debitis esse, quisquam odio omnis id, eligendi blanditiis autem recusandae cum neque vitae eaque enim, explicabo ad impedit iste est modi minima. Quo sapiente a aliquid ipsum aliquam laudantium omnis! Dolor et, dolores, assumenda deleniti architecto repellendus commodi blanditiis accusantium impedit quo voluptatibus a! Ab repellendus deserunt labore debitis mollitia nihil, sit nemo. Sit similique id, illum praesentium quae rem ducimus dolor aliquid totam explicabo at sequi iure sed perspiciatis neque deserunt tempora fuga, nostrum pariatur rerum aliquam numquam! Tempora rerum, minima mollitia sit quia est culpa vitae fuga blanditiis non necessitatibus ipsam. Est aperiam distinctio maiores qui aliquam, nesciunt rem ipsa ratione sed nisi a explicabo omnis optio eaque incidunt culpa excepturi, voluptates eveniet consequuntur, in temporibus debitis suscipit molestias ducimus!</p>
                    <h2>Siisai so gana amra sign korlam</h2>
                    <div className="parentsSign">
                        <div>
                            <p>Full Name/Fingure</p>
                        </div>
                        <div className="subParentInfo">
                            <label>1. Husband: <TextField id="standard-basic" variant="standard" />
                            </label>
                            <label>1. Wife:<TextField id="standard-basic" variant="standard" />
                            </label>
                        </div>
                    </div>
                </div>

             
        </>
    );
}

export default operationNote;