const baseUrl = import.meta.env.VITE_BASE_URL;
export const endpoints = {
  products: `${baseUrl}products`,
  search: (searchTerm: string) => `${baseUrl}products/search?q=${searchTerm}`,
  paginatedSearchableProducts: (
    limit: number = 10,
    skip: number = 0,
    filter: string = ""
  ) =>
    `${baseUrl}products/search?q=${filter}&limit=${limit}&skip=${limit * skip}`,
};
