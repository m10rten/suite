import { cache } from "react";
import { unstable_cache } from "next/cache";
import { z } from "zod";

import { Product, product } from "./schemas";

const baseUrl = "https://api.vercel.app";

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(`${baseUrl}${url}`);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
}

const callers = {
  products: {
    list: async (): Promise<Product[]> => {
      const res = await fetcher("/products");
      const parsed = z.array(product).parse(res);
      return parsed;
    },
    get: async (id: string | number): Promise<Product> => {
      const res = await fetcher(`/products/${id}`);
      const parsed = product.parse(res);
      return parsed;
    },
  },
};

export const api = {
  reactCache: {
    products: {
      list: cache(callers.products.list),
      get: cache(callers.products.get),
    },
  },
  unstableNextCache: {
    products: {
      list: unstable_cache(callers.products.list),
      get: unstable_cache(callers.products.get),
    },
  },
};
