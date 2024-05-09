import "./App.css";
import { Header } from "./components/header/Header";
import { Table } from "./components/table/Table";
import { Loading } from "./shared/components/loading/Loading";
import { useBasket } from "./shared/hooks/useBasket";
import { useFilter } from "./shared/hooks/useFilter";
import { usePage } from "./shared/hooks/usePage";
import { useQueryProducts } from "./shared/query/useQueryProducts";
import { Pagination } from "./components/pagination/Pagination";

function App() {
  
  const { handlePaginationClick, page } = usePage();

  const { basket, handleAdd, handleRemove } = useBasket();

  const { debouncedFilter, handleFilter } = useFilter();

  const { data: productResponse } = useQueryProducts(page, debouncedFilter);

  if (!productResponse) return <Loading description="Fetching Products" />;

  return (
    <>
      <Header
        basket={basket}
        handleFilter={handleFilter}
        handleRemove={handleRemove}
      />
      <hr />
      <Table
        basket={basket}
        handleAdd={handleAdd}
        productsResponse={productResponse}
      />
      <Pagination handleClick={handlePaginationClick} page={page} />
    </>
  );
}

export default App;
