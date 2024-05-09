import React from "react";
import { Button } from "../../shared/components/button";
import { Input } from "../../shared/components/input";
import { BasketPopup } from "../basketPopup/BasketPopUp";
import { Basket } from "../../shared/types";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

type PropsType = {
  basket: Basket;
  handleRemove: (id: number) => () => void;
  handleFilter: React.ChangeEventHandler<HTMLInputElement>;
};

export const Header = (props: PropsType) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <BasketPopup
        basket={props.basket}
        handleClose={handleClose}
        handleRemove={props.handleRemove}
        open={open}
        anchorEl={anchorEl}
      />
      <div className="header">
        <Input type="text" onChange={props.handleFilter} />
        <Button onClick={handleClick} disabled={false}>
          <ShoppingBasketIcon />
        </Button>
      </div>
    </>
  );
};
