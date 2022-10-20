import { Button, Dialog, DialogActions, DialogTitle, FilledInput, FormControl, Grid, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
 
function PostOperation() {
  const [note, setNote] = useState("")
  const [allData, setAllData] = useState([])
  const [open, setOpen] = React.useState(false);
  const [medicine, setMedicine] = useState("");
  const [does, setDose] = useState("");
  const [duration, setDuration] = useState("");
  const [remark, setRemark] = useState("");
  const [Advise, setAdvise] = useState([])


  const handleClose = () => {
    setOpen(false);
  };

  const showList = () => {
    setOpen(true)
  }

  const handleDEleted = (index) => {
      allData.splice(index, 1)
      setAllData([...allData])
    }
    const handleAdd = () => {
      const notes = document.getElementById('standard-textarea');
      if (note.length !== 0) {
        setAllData(newData => [...newData, note])
      }
      notes.value = '';
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


  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = { remark, does, duration, medicine, allData };
    const url = `http://localhost:5000/PostOperationData`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => {
      console.log('as', data);
      alert('Added your pre operation medicine');
    

    })

  }


  const submitAdviseNote = (event) => {
    event.preventDefault();
    const postData = { note };
    const url = `http://localhost:5000/postOperationNote`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(postData)
    })

      .then(res => res.json())
      .then(data => {
        console.log('as', data);
        alert('sent data');

      })
  }

  useEffect(() => {
    fetch(`http://localhost:5000/postOperationNote`)
      .then(res => res.json())
      .then(data => setAdvise(data));

  }, [])


  const handleDElete = (id) => {
    const url = `http://localhost:5000/operationpost/${id}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount > 0){
          console.log('deleted');
          const remaining = Advise.filter(postData => postData._id !== id);
           setAdvise(remaining);
      }
      })
  }



  return (
    <div className="preContainer">
      <div>
        <p>Prescription for post operation</p>
        <div >
          <div className="switchIcon" >
            <p><Switch /></p><p>Show Contraindicated List</p>
          </div>
          <div className="switchIcon" >
            <p><Switch /></p><p>Show medicine Suggestation </p>
          </div>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount"> Enter medicine</InputLabel>
            <FilledInput onChange={(e) => setMedicine(e.target.value)}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel name="does" htmlFor="filled-adornment-amount"> Dose</InputLabel>
            <FilledInput onChange={(e) => setDose(e.target.value)}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
          <div className="rootDuration">
            <div className="duration">
              <FormControl variant="filled">
                <InputLabel name="duration" htmlFor="filled-adornment-amount"> Duration</InputLabel>
                <FilledInput onChange={(e) => setDuration(e.target.value)}
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
            <InputLabel name="remark" htmlFor="filled-adornment-amount"> Remarks</InputLabel>
            <FilledInput
              sx={{ p: 3 }} onChange={(e) => setRemark(e.target.value)}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
        </div>

        <div className="remarkBtn">
          {/* 
          <Button onClick={(e) => handleSubmit(e)}>  Add</Button> */}
          <Button onClick={handleSubmit}>  Add</Button>
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

              {
                Advise.map((singleData) =>
                  <>
                    <Grid key={singleData._id} sx={{ display: 'flex', alignItems: 'center', ms: 1, p: 0, m: 0, }} >

                      <input type="checkbox" id="" onChange={handleCheck} />
                      <p key={singleData._id}>{singleData.note}</p>
                      <DeleteIcon onClick={() => handleDElete(singleData._id)} />
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
        id="standard-textarea" label="advise noted" placeholder="Note/Advise" multiline variant="standard" className="inFild" onChange={(e) => setNote(e.target.value)} />
      <div className="adviseBtn ">
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={showList} >Favorite list</Button>
        <Button onClick={submitAdviseNote} >  Add as a Fovarite</Button>

      </div>
      <div className="inputShow">
        <ul key={'1'} id="locatItem"></ul>

        {
          allData.map((singleData, index) =>
            <>
              <div className="inputValue">
                <input type="checkbox" name="" id="" onChange={handleCheck} />
                <p key={index}>{singleData}</p>
                <DeleteIcon onClick={() => handleDEleted(index)} />
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}
export default PostOperation; 