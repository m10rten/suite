import { z } from "zod";

export const Base = z.object({
  id: z.string().uuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
export type Base = z.infer<typeof Base>;

export const Account = Base.extend({
  userId: z.string().uuid(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});
export type Account = z.infer<typeof Account>;

export const Session = Base.extend({
  sessionToken: z.string().uuid(),
  userId: z.string().uuid(),
  expires: z.date(),
});
export type Session = z.infer<typeof Session>;

export const User = Base.extend({
  name: z
    .string({ invalid_type_error: "Invalid name" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .max(255, { message: "Email cannot be longer than 255 characters" }),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.array(Account).optional().nullable(),
  sessions: z.array(Session).optional().nullable(),
});
export type User = z.infer<typeof User>;
