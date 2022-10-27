import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';
import moment from 'moment';

const Select = () => {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  let e = end;
  let m = new Date(e).toGMTString()
  //console.log(m)
  //console.log("start",start)
  console.log("end",new Date(m).getTime())
  return (
    <div>
      <h1>test</h1>
      <DatePicker placeholder="Choose Start Date" value={start} onChange={setStart} />
      <DatePicker placeholder="Choose End Date" value={end} onChange={setEnd} />
    </div>
  );
};

export default Select;
