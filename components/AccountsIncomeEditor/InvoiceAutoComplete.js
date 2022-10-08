import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const InvoiceAutoComplete = ({
  label = "Select Option",
  options = [{ label: "Option 1" }, { label: "Option 2" }],
  handleSelect = () => null,
  defaultValue,
}) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option) => option.label || option.name,
  };
  console.log("options from InvoiceAutoComplete:", options);

  return (
    <Autocomplete
      {...defaultProps}
      size="small"
      isOptionEqualToValue={(option, value) => {
        if (typeof option === "object") {
          if (option.name) return option.name === value.name;
          else if (option.label) return option.label === value.label;
        } else {
          return option === value;
        }
      }}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
      defaultValue={defaultValue ? defaultValue : null}
      onChange={(event, newValue) => {
        handleSelect ? handleSelect(newValue) : null;
      }}
    />
  );
};

export default InvoiceAutoComplete;
