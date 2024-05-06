import {
  QueryClient,
  QueryClientProvider as MyProvider,
} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }) => {
  return <MyProvider client={queryClient}>{children}</MyProvider>;
};
