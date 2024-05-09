import "./empty.css";
import React from "react";
import emptyCart from "../../../assets/empty-cart.png";

type PropsType = {
  description?: string;
};
export const Empty = (props: PropsType) => {
  return (
    <div className="empty">
      <img className="emptyCart" src={emptyCart} alt="empty cart" />
      <h4> {props.description ?? "No item is selected"}</h4>
    </div>
  );
};
