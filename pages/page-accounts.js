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
} from "@mui/material";
import Grids from "../components/Grids";

import jsonData from "../data.json";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
export default function BasicButtons() {
  const [discount, setDiscount] = React.useState();
  const [discountBy, setDiscountBy] = React.useState();
  const [value, setValue] = React.useState([null, null]);
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
    } else if (value[0] !== null) {
      body = jsonData?.data?.filter(
        (item) =>
          new Date(value[0]) < new Date(item.createdDatetimeStamp) &&
          new Date(value[1]) > new Date(item.createdDatetimeStamp)
      );
    }

    console.log(body);
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
          >
            <MenuItem value={"Doctor"}>Doctor</MenuItem>
            <MenuItem value={"Management"}>Management</MenuItem>
            <MenuItem value={"Organization"}>Organization</MenuItem>
          </Select>
        </FormControl>

        <DateRangePicker onChange={setValue} value={value} />
        <Button variant="contained" onClick={handleSubmit}>
          Search
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setDiscount("");
            setDiscountBy("");
            setValue([null, null]);
            setData(jsonData?.data);
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (window !== undefined) {
              window.print();
            }
          }}
        >
          Print
        </Button>
      </Stack>
      <Box sx={{ my: 2 }}>
      {!discount && !discountBy ? <Box></Box> : <Grids data={data} />}
      </Box>
    </Container>
  );
}
