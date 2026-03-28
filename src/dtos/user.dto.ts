import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is mandatory").max(100, "Name is too long"),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF must be on format XXX.XXX.XXX-XX"
    ),
  email: z.string().email("Invalid email format"),
  type: z.enum(["user", "admin"], {
    message: "Type must be either 'user' or 'admin'",
  }),
});
export type UserInput = z.infer<typeof userSchema>;
export const userUpdateSchema = userSchema.partial();
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
