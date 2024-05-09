import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import "./App.css";
import { endpoints } from "./api/endpoints";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { Input } from "./components/input";
import { useDebounce } from "@uidotdev/usehooks";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Popover from "@mui/material/Popover";
import { BasketCard } from "./components/basketCard";
import { Empty } from "./components/empty/Empty";
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type ProductResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

type Basket = Record<
  string,
  {
    product: Product;
    count: number;
  }
>;
function App() {
  const [page, setPage] = React.useState(0);
  const [basket, setBasket] = React.useState<Basket>({});
  const [filter, setFilter] = React.useState<string | undefined>(undefined);

  const getProducts = async (
    skip: number,
    filter: string | undefined
  ): Promise<ProductResponse> => {
    console.log({ skip, filter });
    // if (!filter) setPage(0);
    const res = await fetch(
      endpoints.paginatedSearchableProducts(12, skip, filter)
    );
    return res.json();
  };
  const debouncedFilter = useDebounce<string | undefined>(filter, 500);
  const {
    data: products,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["products", page, debouncedFilter],
    queryFn: () => getProducts(page, debouncedFilter),
    placeholderData: keepPreviousData,
  });

  const handlePaginationClick = (page: number) => () => {
    console.log({ page });
    setPage(page);
  };
  const handleFilter = (e) => setFilter(e.target.value);
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
  if (!products) return <div> not loaded</div>;
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          {!basket || Object.keys(basket).length === 0 ? (
            <Empty />
          ) : (
            Object.keys(basket).map((id) => {
              const product = basket[id].product;
              return (
                <BasketCard
                  img={product.thumbnail}
                  discount={product.discountPercentage}
                  price={product.price}
                  title={product.title}
                  count={basket[id].count}
                  handelDelete={handleRemove(product.id)}
                />
              );
            })
          )}
        </div>
      </Popover>
      <div className="header">
        <Input type="text" onChange={handleFilter} />
        <Button onClick={handleClick} disabled={false}>
          <ShoppingBasketIcon />
        </Button>
      </div>
      <hr />
      <div className="productsContainer">
        {products.products.map((product) => (
          <Card
            img={product.thumbnail}
            description={product.description}
            discount={product.discountPercentage}
            price={product.price}
            title={product.title}
            key={product.id}
            count={basket[product.id]?.count}
            select={handleAdd(product)}
          />
        ))}
      </div>
      <div className="paginationContainer">
        {[0, 1, 2].map((pageNumber) => (
          <Button
            disabled={page === pageNumber}
            onClick={handlePaginationClick(pageNumber)}
          >
            {String(pageNumber + 1)}
          </Button>
        ))}
      </div>
    </>
  );
}

export default App;
