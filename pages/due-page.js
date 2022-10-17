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
import Grids from "../components/dueGrids";

import jsonData from "../dueData.json";
import ReactToPrint from "react-to-print";
import { WidthFull } from "@mui/icons-material";

export default function BasicButtons() {
  const [discount, setDiscount] = React.useState();
  const [discountBy, setDiscountBy] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const componentRef = React.useRef();
  const [invoice, setInvoice] = React.useState("");
  const [name, setName] = React.useState("");
  console.log(jsonData);
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
    if (discountBy || discount) {
      body = jsonData?.data?.filter(
        (item) => item.discount >= discount && item.discountBy === discountBy
      );
    } else if (start && end) {
      body = jsonData?.data?.filter(
        (item) =>
          new Date(start) < new Date(item.createdDatetimeStamp) &&
          new Date(end) > new Date(item.createdDatetimeStamp)
      );
    } else {
      body = jsonData?.data?.filter(
        (item) =>

          new Date(start) < new Date(item.createdDatetimeStamp) &&
          new Date(end) > new Date(item.createdDatetimeStamp)
      );
    }

    setData(body);
  };

  return (
    <Container maxWidth={"lg"} sx={{ my: 2 }}>
      <Stack spacing={4} direction="row">
        <TextField

          label="All"
          onChange={(e) => setDiscount(e.target.value)}
          fullWidth
          color="secondary"
          type="number"
        />

        <TextField
          id="demo-simple-select"
          value={discount}
          label="User"
          onChange={(e) => setDiscount(e.target.value)}
          fullWidth
          color="secondary"
          type="text"
        />

        <Button maxWidth={"md"} className="dateStyle"
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
          className="reset" variant="contained"
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
          trigger={() => <Button className="print" sx={{ boxShadow: 2 }}>Print </Button>}
          content={() => componentRef.current}
        />


      </Stack>
      <Box sx={{ my: 2 }}>
        {console.log(!discount, !discount && !discountBy, !start, !end)}
        {!discount && !discountBy && !start && !end ? (
          <Box></Box>
        ) : (
          <Grids
            data={data}
            refpropanothername={componentRef}
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