import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { endpoints } from "../api/endpoints";
import { ProductResponse } from "../types";

const getProducts = async (
  skip: number,
  filter: string | undefined
): Promise<ProductResponse> => {
  const res = await fetch(
    endpoints.paginatedSearchableProducts(12, skip, filter)
  );
  return res.json();
};

export const useQueryProducts = (page: number, filter: string | undefined) => {
  return useQuery({
    queryKey: ["products", page, filter],
    queryFn: () => getProducts(page, filter),
    placeholderData: keepPreviousData,
  });
};
