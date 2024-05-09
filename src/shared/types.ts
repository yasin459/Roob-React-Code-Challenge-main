export type Product = {
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

export type ProductResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

export type Basket = Record<
  string,
  {
    product: Product;
    count: number;
  }
>;
