import React from "react";
import InvoiceTextField from "./InvoiceTextField";

const TableTextField = ({ onChange, defaultValue, minValue = 0 }) => {
  return (
    <InvoiceTextField
      onChange={onChange}
      defaultValue={defaultValue}
      required={false}
      sx={{ width: "5rem" }}
      minValue={minValue}
    />
  );
};

export default TableTextField;
