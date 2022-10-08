import { TextField } from "@mui/material";
import React from "react";

const InvoiceTextField = ({
  InputLabelProps = { shrink: true },
  type = "number",
  onChange = () => null,
  defaultValue = 0,
  variant = "outlined",
  // margin="normal"
  size = "small",
  required = false,
  sx,
}) => {
  return (
    <TextField
      InputLabelProps={InputLabelProps}
      type={type}
      onChange={onChange}
      defaultValue={defaultValue}
      variant={variant}
      size={size}
      required={required}
      sx={{ backgroundColor: "white", ...sx }}
      //   disabled={}
    />
  );
};

export default InvoiceTextField;
