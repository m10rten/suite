import { z } from "zod";

export const Base = z.object({
  id: z.string().uuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
export type Base = z.infer<typeof Base>;

export const User = Base.extend({
  id: z.string().uuid(),
  name: z
    .string({ invalid_type_error: "Invalid name" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  email: z.string().email({ message: "Invalid email" }),
  ip: z.string().ip({ message: "Invalid IP" }).optional().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
export type User = z.infer<typeof User>;
