import { TextField } from "@mui/material";
import React from "react";
import { colors } from "../../src/theme";

const IncomeTextField = ({
  label = "Address",
  filedName = "name",
  handleOnChange,
  size = "small",
  type = "text",
  defaultValue,
  sx,
}) => {
  return (
    <TextField
      fullWidth
      required
      type={type}
      size={size}
      label={label}
      onChange={(e) => handleOnChange(e, filedName)}
      defaultValue={defaultValue ? defaultValue : null}
      sx={{ ...sx }}
    />
  );
};

export default IncomeTextField;
