import { Basket, Product, ProductResponse } from "../../shared/types";
import { Card } from "../../shared/components/card";
type PropsType = {
  productsResponse: ProductResponse;
  basket: Basket;
  handleAdd: (product: Product) => () => void;
};
export const Table = (props: PropsType) => {
  return (
    <div className="productsContainer">
      {props.productsResponse.products.map((product) => (
        <Card
          img={product.thumbnail}
          description={product.description}
          discount={product.discountPercentage}
          price={product.price}
          title={product.title}
          key={product.id}
          count={props.basket[product.id]?.count}
          select={props.handleAdd(product)}
        />
      ))}
    </div>
  );
};
