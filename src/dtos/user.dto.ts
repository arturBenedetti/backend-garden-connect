import { z } from "zod";

export class UserDTO {
  static schema = z.object({
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

  static updateSchema = UserDTO.schema.partial();

  static validate(input: unknown) {
    return UserDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UserDTO.updateSchema.parse(input);
  }
}

export type UserInput = z.infer<typeof UserDTO.schema>;
export type UserUpdateInput = z.infer<typeof UserDTO.updateSchema>;
