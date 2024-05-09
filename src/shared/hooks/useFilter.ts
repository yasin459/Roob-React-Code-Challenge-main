import { useDebounce } from "@uidotdev/usehooks";
import React from "react";

export const useFilter = () => {
  const [filter, setFilter] = React.useState<string | undefined>(undefined);

  const debouncedFilter = useDebounce<string | undefined>(filter, 500);

  const handleFilter = (e: any) => setFilter(e.target.value);

  return { debouncedFilter, handleFilter };
};
