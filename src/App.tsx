import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import "./App.css";
import { endpoints } from "./api/endpoints";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { Input } from "./components/input";
import { useDebounce } from "@uidotdev/usehooks";

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
function App() {
  const [page, setPage] = React.useState(0);

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
  const [filter, setFilter] = React.useState(undefined);
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
  if (!products) return <div> not loaded</div>;
  return (
    <>
      <div className="header">
        <Input type="text" onChange={handleFilter} />
        <Button>Click me</Button>
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
