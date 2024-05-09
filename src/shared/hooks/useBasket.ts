import React from "react";
import { Basket, Product } from "../types";

export const useBasket = () => {
  const [basket, setBasket] = React.useState<Basket>({});

  const handleAdd = (product: Product) => () => {
    setBasket((prevBasket) => ({
      ...prevBasket,
      [product.id]: {
        product,
        count: (prevBasket[product.id]?.count ?? 0) + 1,
      },
    }));
  };

  const handleRemove = (id: number) => () => {
    setBasket((prevBasket) => {
      const newBasket = { ...prevBasket };
      delete newBasket[id];
      return newBasket;
    });
  };
  return { handleAdd, handleRemove, basket };
};
