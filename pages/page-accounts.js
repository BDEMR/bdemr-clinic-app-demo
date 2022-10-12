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
import Grids from "../components/Grids";

import jsonData from "../data.json";
import ReactToPrint from "react-to-print";

export default function BasicButtons() {
  const [discount, setDiscount] = React.useState();
  const [discountBy, setDiscountBy] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const componentRef = React.useRef();

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
    if (discountBy && discount) {
      body = jsonData?.data?.filter(
        (item) => item.discount >= discount && item.discountBy === discountBy
      );
    } else if (discountBy) {
      body = jsonData?.data?.filter((item) => item.discountBy === discountBy);
    } else if (discount) {
      body = jsonData?.data?.filter((item) => item.discount >= discount);
    } else if (start && end) {
      body = jsonData?.data?.filter(
        (item) =>
          new Date(start) < new Date(item.createdDatetimeStamp) &&
          new Date(end) > new Date(item.createdDatetimeStamp)
      );
    } else {
      body = jsonData?.data?.filter(
        (item) =>
          item.discount >= discount &&
          item.discountBy === discountBy &&
          new Date(start) < new Date(item.createdDatetimeStamp) &&
          new Date(end) > new Date(item.createdDatetimeStamp)
      );
    }

    setData(body);
  };

  return (
    <Container maxWidth={"lg"} sx={{ my: 5 }}>
      <Stack spacing={2} direction="row">
        <TextField
          id="demo-simple-select"
          value={discount}
          label="Discount Found"
          onChange={(e) => setDiscount(e.target.value)}
          fullWidth
          color="secondary"
          type="number"
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Discount By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={discountBy}
            label="Discount By"
            onChange={(e) => setDiscountBy(e.target.value)}
            color="secondary"
          >
            <MenuItem value={"Doctor"}>Doctor</MenuItem>
            <MenuItem value={"Management"}>Management</MenuItem>
            <MenuItem value={"Organization"}>Organization</MenuItem>
          </Select>
        </FormControl>

        {/* <DateRangePicker onChange={setValue} value={value} /> */}
        {/* <DatetimeRangePicker onChange={setValue} value={value} /> */}

        <Button
          color="secondary"
          fullWidth
          onClick={handleClick}
          variant="outlined"
        >
          Filter By
        </Button>
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
              label="Start Date"
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
        <Button variant="contained" onClick={handleSubmit}>
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
        <ReactToPrint
          trigger={() => <Button variant="contained">Print</Button>}
          content={() => componentRef.current}
        />
      </Stack>
      <Box sx={{ my: 2 }}>
        {console.log(!discount, !discount && !discountBy, !start, !end)}
        {!discount && !discountBy && !start && !end ? (
          <Box></Box>
        ) : (
          <Grids data={data} refpropanothername={componentRef} />
        )}
      </Box>
    </Container>
  );
}