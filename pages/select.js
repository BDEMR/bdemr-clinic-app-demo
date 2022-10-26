import * as React from "react";

import Box from "@mui/material/Box";
import { DatePicker } from "@mantine/dates";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { useState } from "react";
import { Typography } from "@mui/material";

const defaultEndDate = new Date();
const now = new Date();
const defaultStartDate = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 30
);
// defaultStartDate.setHours(23, 59, 59, 999);

export default function BasicDateRangePicker({



  label = "Select Date Range",
  startDate = defaultStartDate,
  endDate = defaultEndDate,
  dateRange,
  setDateRange,
}) {


  const [start, setStartDate] = useState()
  const [end, setEndDate] = useState()
 
    [dateRange, setDateRange] = useState([startDate, endDate]);
  

  const handleFilterDate = (range) => {
    console.log("range:", range);
    console.log("range[1]:", range[1], typeof range[1]);
     let eDate = range[1].setHours(23, 59, 59, 999);
     range[1] = eDate;
    if (range[0]) {
      let sDate = range[0].setHours(0, 0, 0, 0);
      range[0] = sDate;
      setStartDate(sDate);
    }
    if (range[1]) {
      let eDate = range[1].setHours(23, 59, 59, 999);
      range[1] = eDate;
      setEndDate(eDate);
    }
    console.log("value after:", dateRange);
    console.log("range after:", range);
  };

  console.log(start)
  console.log(end)
  return (

    <div>
      <DateRangePicker
        label={label}
        placeholder="Pick dates range"
        value={dateRange}
        onChange={setDateRange}
      />
      <button onClick={handleFilterDate}>filter</button>
    </div>

  );
}