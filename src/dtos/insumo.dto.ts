import { z } from "zod";

export class InsumoDTO {
  static schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório").max(200, "Nome muito longo"),
    quantidade: z
      .number()
      .min(0, "Quantidade não pode ser negativa"),
    unidade: z
      .string()
      .min(1, "Unidade é obrigatória")
      .max(50, "Unidade muito longa"),
    gardenId: z.string().min(1, "Id da horta é obrigatório"),
  });

  static updateSchema = InsumoDTO.schema.partial();

  static validate(input: unknown) {
    return InsumoDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return InsumoDTO.updateSchema.parse(input);
  }
}

export type InsumoInput = z.infer<typeof InsumoDTO.schema>;
export type InsumoUpdateInput = z.infer<typeof InsumoDTO.updateSchema>;
