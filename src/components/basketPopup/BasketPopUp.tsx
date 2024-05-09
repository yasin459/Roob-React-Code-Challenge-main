import { Popover } from "@mui/material";
import { Empty } from "../../shared/components/empty/Empty";
import BasketCard from "../../shared/components/basketCard/BasketCard.jsx";
import { Basket } from "../../shared/types";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  basket: Basket;
  handleRemove: (id: number) => () => void;
  anchorEl: HTMLButtonElement | null;
};

export const BasketPopup = (props: PropsType) => {
  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className="popover">
        {!props.basket || Object.keys(props.basket).length === 0 ? (
          <Empty />
        ) : (
          Object.keys(props.basket).map((id) => {
            const product = props.basket[id].product;
            return (
              <BasketCard
                img={product.thumbnail}
                discount={product.discountPercentage}
                price={product.price}
                title={product.title}
                count={props.basket[id].count}
                handelDelete={props.handleRemove(product.id)}
              />
            );
          })
        )}
      </div>
    </Popover>
  );
};
