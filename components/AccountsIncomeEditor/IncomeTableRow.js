import { Icon } from "@iconify/react";
import { Transition } from "@mantine/core";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import AppButton from "../../reusables/AppButton";
import { $toTwoDecimalPlace } from "../../src/utils/common-computes";
import { appStyles } from "../../styles/appStyle";
import { _getDiscountedPrice } from "./computations";
import TableTextField from "./TableTextField";

const IncomeTableRow = ({ data, handleChange, index, deleteItemClicked }) => {
  const [item, setItem] = useState(data);

  // handleClickOpen("Are you sure", (yes) => {
  //   if (yes) {
  //     _deleteWaitList(item._id, () => {
  //       waitLists.splice(index, 1);
  //     });
  //   }
  // });

  const quantityChanged = (value) => {
    value = parseInt(value);
    let quantity = parseInt(item.stock);
    if (value >= 1 && value <= quantity) {
      let totalPrice = Number(item.price) * value;
      let discountedPrice = _getDiscountedPrice(
        item.discountAmount,
        item.discountType,
        item.price,
        value
      );
      let updatedItem = { ...item, qty: value, totalPrice, discountedPrice };
      setItem(updatedItem);
      handleChange ? handleChange(updatedItem) : null;
    } else if (value < 1) {
      showWarning("Item Quantity can't be less than 1");
      setItem({ ...item, qty: 1 });
    } else {
      showWarning("Item Quantity can't be greater than Stock!");
      let discountedPrice = _getDiscountedPrice(
        item.discountAmount,
        item.discountType,
        item.price,
        value
      );
    }
  };

  const getItemTotal = (item) => {
    return $toTwoDecimalPlace(item.qty * item.unitPrice);
  };

  return (
    <TableRow>
      <TableCell colSpan={2}>{item?.name}</TableCell>
      <TableCell>{item?.category}</TableCell>
      <TableCell>{item?.qty}</TableCell>
      <TableCell>{item?.unitPrice}</TableCell>
      <TableCell>{getItemTotal(item)}</TableCell>
      <TableCell
        align="right"
        onClick={
          () => deleteItemClicked(index)
          // handleClickOpen("Are you sure", (yes) => {
          //   if (yes) {
          //     deleteItemClicked(index);
          //   }
          // })
        }
      >
        <IconButton aria-label="delete" size="large">
          <Icon icon={"ic:baseline-delete"} width={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default IncomeTableRow;
