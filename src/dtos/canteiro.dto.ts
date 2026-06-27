import { z } from "zod";

export class CanteiroDTO {
  static schema = z.object({
    numero: z.number().int("Número deve ser inteiro").min(1, "Número deve ser positivo"),
    area: z.number().min(0, "Área não pode ser negativa"),
    gardenId: z.string().min(1, "Id da horta é obrigatório"),
  });

  static updateSchema = CanteiroDTO.schema.partial();

  static validate(input: unknown) {
    return CanteiroDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return CanteiroDTO.updateSchema.parse(input);
  }
}

export type CanteiroInput = z.infer<typeof CanteiroDTO.schema>;
export type CanteiroUpdateInput = z.infer<typeof CanteiroDTO.updateSchema>;
