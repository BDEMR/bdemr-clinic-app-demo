import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
  Menu,
} from "@mui/material";
 
import Grids from "../components/patientStayGrid";
import jsonData from "../dueData.json";

export default function BasicButtons() {
  const [discount, setDiscount] = React.useState();
  const [discountBy, setDiscountBy] = React.useState();
  const [discountUnit, setDiscountUnit] = React.useState();
  const [word, setWord] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [invoice, setInvoice] = React.useState("");
  const [name, setName] = React.useState("");
  const [showDept, setShowDept] = React.useState(false);
  const [showUnit, setUnit] = React.useState(false);
  const [showords, setShoword] = React.useState(false);


  const dataDept = () => {
    setShowDept(true)
  }

  const dataDeptunit = () => {
    setUnit(true)
  }

  const showWord = () => {
    setShoword(true);
  }
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  const [data, setData] = React.useState(jsonData.data);

  const handleSubmit = () => {
    let body = [];
    if (discountBy) {
      body = jsonData?.data?.filter(
        (item) => item.discountBy === discountBy
      );
    } else if (start && end) {
      body = jsonData?.data?.filter(
        (item) =>
          new Date(start) < new Date(item.createdDatetimeStamp) &&
          new Date(end) > new Date(item.createdDatetimeStamp)
      );
    }
    else {
      body = jsonData?.data?.filter(
        (item) =>

          item.discountBy === discountBy &&
          new Date(start) < new Date(item.createdDatetimeStamp) &&
          new Date(end) > new Date(item.createdDatetimeStamp)
      );
    }

    setData(body);
  };

  return (
    <Container maxWidth={"lg"} sx={{ my: 2 }}>
      <Stack spacing={4} direction="row">
        <div onClick={dataDept}>
          <Button maxWidth={"lg"} className="dateStyle" sx={{ p: 2, width: '400px' }}
            color="secondary"
            fullWidth
            onClick={handleClick}
            variant="outlined"
          >
            Filter By

          </Button>
        </div>

        {
          showDept ? <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={discountBy}
              label="Discount By"
              onChange={(e) => setDiscountBy(e.target.value)}
              onClick={dataDeptunit}
              color="secondary"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Doctor"}>Doctor</MenuItem>
              <MenuItem value={"Management"}>Management</MenuItem>
              <MenuItem value={"Organization"}>Organization</MenuItem>
            </Select>
          </FormControl> : null
        }


        {
          showUnit ?
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={discountUnit}
                label="Discount By"
                onChange={(e) => setDiscountUnit(e.target.value)}
                onClick={showWord}
                color="secondary"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"u1"}>U1</MenuItem>
                <MenuItem value={"u2"}> u2</MenuItem>
                <MenuItem value={"u3"}> u3</MenuItem>
              </Select>
            </FormControl> : null
        }
        {
          showords ?
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Word</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={word}
                label="Discount By"
                onChange={(e) => setWord(e.target.value)}

                color="secondary"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Doctor"}> C1</MenuItem>
                <MenuItem value={"Management"}>C2</MenuItem>
                <MenuItem value={"Organization"}> C3</MenuItem>
              </Select>
            </FormControl> : null

        }

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >

          <MenuItem>
            <TextField
              value={start}
              label="start date"
              onChange={(e) => setStart(e.target.value)}
              fullWidth
              type="date"
            />
          </MenuItem>
          <MenuItem>
            <TextField
              value={end}
              label="End Date"
              onChange={(e) => setEnd(e.target.value)}
              fullWidth
              type="date"
            />
          </MenuItem>
        </Menu>

        <Button className="search" variant="contained" type="submit" onClick={handleSubmit}>
          Search
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setDiscount("");
            setDiscountBy("");
            setStart("");
            setEnd("");
            setData(jsonData?.data);
          }}
        >
          Reset
        </Button>

      </Stack>
      <Box sx={{ my: 2 }}>
        {!discount && !discountBy && !start && !end ? (
          <Box></Box>
        ) : (
          <Grids
            data={data}
            setData={setData}
            invoice={invoice}
            setInvoice={setInvoice}
            name={name}
            setName={setName}
          />
        )}
      </Box>
    </Container>
  );
}