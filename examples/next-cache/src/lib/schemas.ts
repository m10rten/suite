import { z } from "zod";

export const product = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
  price: z.number().positive().finite(),
  description: z.string(),
  category: z.string(),
  stock: z.number().positive().int(),
});

export type Product = z.infer<typeof product>;
