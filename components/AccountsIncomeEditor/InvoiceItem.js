import { Grid, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../src/theme";
import { appStyles } from "../../styles/appStyle";

const InvoiceItem = (props) => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        p: 1,
        px: 3,
        mb: 0.25,
        backgroundColor: colors.light,
        borderRadius: "5px",
      }}
    >
      <Grid
        item
        md={3}
        sm={3}
        xs={3}
        // spacing={1}
        sx={{
          ...appStyles.flexRowLeft,
        }}
      >
        <Typography sx={{ ...props.sx }}>{props.label}</Typography>
      </Grid>
      <Grid
        item
        container
        spacing={0}
        md={9}
        sm={9}
        xs={9}
        sx={{ ...appStyles.flexRowLeft }}
      >
        {props.children}
      </Grid>
    </Grid>
  );
};

export default InvoiceItem;
