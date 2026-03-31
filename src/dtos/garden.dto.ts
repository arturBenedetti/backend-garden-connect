import { z } from "zod";

export class GardenDTO {
  static schema = z.object({
    name: z.string().min(1, "Name is mandatory").max(100, "Name is too long"),
    localization: z
      .string()
      .min(1, "Localization is mandatory")
      .max(100, "Name is too long"),
  });

  static updateSchema = GardenDTO.schema.partial();

  static validate(input: unknown) {
    return GardenDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return GardenDTO.updateSchema.parse(input);
  }
}

export type GardenInput = z.infer<typeof GardenDTO.schema>;
export type GardenUpdateInput = z.infer<typeof GardenDTO.updateSchema>;
