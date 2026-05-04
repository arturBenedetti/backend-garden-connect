import { z } from "zod";

export class EquipmentDTO {
  static schema = z.object({
    name: z.string().min(1, "Name is mandatory").max(200, "Name is too long"),
    state: z.string().min(1, "State is mandatory").max(100, "State is too long"),
    gardenId: z.string().min(1, "Garden id is mandatory"),
  });

  static updateSchema = EquipmentDTO.schema.partial();

  static validate(input: unknown) {
    return EquipmentDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return EquipmentDTO.updateSchema.parse(input);
  }
}

export type EquipmentInput = z.infer<typeof EquipmentDTO.schema>;
export type EquipmentUpdateInput = z.infer<typeof EquipmentDTO.updateSchema>;
