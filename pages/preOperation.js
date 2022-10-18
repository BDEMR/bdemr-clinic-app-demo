import { Button, Dialog, DialogActions, DialogTitle, FilledInput, FormControl, Grid, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';


function Advise() {
  const [name, setName] = useState("")
  const [allData, setAllData] = useState([])
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const showList=()=>{
    setOpen(true)
  }
  const handleAdd = () => {
    const note = document.getElementById('standard-textarea');
    if (name.length !== 0) {
      setAllData(newData => [...newData, name])

    }
    note.value = '';

  }

  const handleDElete = (index) => {
    allData.splice(index, 1)
    setAllData([...allData])
  }

  const handleShow = () => {
    setShowList(true)
  }
  const [optionInfo, setOptionInfo] = useState([]);
  const handleCheck = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setOptionInfo([...optionInfo, value]);
    }
    else {
      setOptionInfo(optionInfo.filter((e) => e !== value));
    }
  }

  const addLocalStorage = () => {
    const note = document.getElementById('standard-textarea');
    const names = note.value;
    if (!names) {
      return;
    }
    addListTodisplay(names);
    note.value = ""
  }

  const getList = () => {
    const list = localStorage.getItem('list');
    let listObj;
    if (list) {
      listObj = JSON.parse(list);
    }
    else {
      listObj = {};
    }
    return listObj;
  }

  const addListTodisplay = names => {
    const list = getList();
    list[names] = 1;
    const listStringfy = JSON.stringify(list);
    localStorage.setItem('list', listStringfy)
  }

  return (
    <div className="preContainer">

      <div>
        <p>Prescription</p>
        <div >
          <div className="switchIcon" >
            <p><Switch /></p><p>Show Contraindicated List</p>
          </div>
          <div className="switchIcon" >
            <p><Switch /></p><p>Show medicine Suggestation </p>
          </div>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount"> Enter medicine</InputLabel>
            <FilledInput
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount"> Dose</InputLabel>
            <FilledInput
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
          <div className="rootDuration">
            <div className="duration">
              <FormControl variant="filled">
                <InputLabel htmlFor="filled-adornment-amount"> Duration</InputLabel>
                <FilledInput
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
              </FormControl>
            </div>
            <div className="prescriptionCheck">
              <Checkbox />
              <p>Continue as needed</p>
            </div>
          </div>


          <FormControl fullWidth sx={{ p: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount"> Remarks</InputLabel>
            <FilledInput
              sx={{ p: 3 }}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
        </div>
        <div className="remarkBtn">
          <Button>Add</Button>
          <Button> clear</Button>
        </div>
      </div>

      <div>
        <p> <input type="checkbox" name="" id="" onChange={handleCheck} />No sigrat smoking for your health </p>
        <p><input type="checkbox" name="" id="" onChange={handleCheck} />No sigrat smoking for your health </p>
        <p><input type="checkbox" name="" id="" onChange={handleCheck} />No sigrat smoking for your health </p>
      <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">    
        </DialogTitle>
        <Grid >
            <p> <input type="checkbox" name="" id="" onChange={handleCheck} />No sigrat smoking for your health </p>
            <p><input type="checkbox" name="" id="" onChange={handleCheck} />No sigrat smoking for your health </p>
            <p><input type="checkbox" name="" id="" onChange={handleCheck} />No sigrat smoking for your health </p>
            {
              allData.map((singleData, index) =>
                <>
                  <Grid   sx={{ display: 'flex'  ,	alignItems:'center',  ms:1, p:0 , m:0,  }} >

                    <input type="checkbox" name="" id="" onChange={handleCheck} />
                    <p key={'1'}>{singleData}</p>
                    <DeleteIcon onClick={() => handleDElete(index)} />
                  </Grid>
                </>
              )
            }    
          </Grid> 
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>Add </Button>
        </DialogActions>
      </Dialog>
    </div>
 </div>

      <TextField
        id="standard-textarea" label="advise noted" placeholder="Note/Advise" multiline variant="standard" className="inFild" onChange={(e) => setName(e.target.value)} />
      <div className="adviseBtn ">
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={showList} >Favorite list</Button>
        <Button  onClick={addLocalStorage} >  Add as a Fovarite</Button>

      </div>
      <div className="inputShow">
        <ul key={'1'} id="locatItem"></ul>

        {
          allData.map((singleData, index) =>
            <>
              <div className="inputValue">
                <input type="checkbox" name="" id="" onChange={handleCheck} />
                <p key={'1'}>{singleData}</p>
                <DeleteIcon onClick={() => handleDElete(index)} />
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}
export default Advise; 