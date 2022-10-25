import { DateRangePicker } from '@mantine/dates';
import { useState } from 'react';


function Demo() {
  

  return (
    <DateRangePicker
      label="Book hotel"
      placeholder="Pick dates range"
      value={value}
      onChange={setValue}
    />
  );
}