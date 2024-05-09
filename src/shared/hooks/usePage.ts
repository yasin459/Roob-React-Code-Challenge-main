import React from "react";

export const usePage = () => {
  const [page, setPage] = React.useState(0);

  const handlePaginationClick = (page: number) => () => {
    console.log({ page });
    setPage(page);
  };

  return { page, handlePaginationClick };
};
