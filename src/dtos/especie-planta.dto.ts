import { z } from "zod";

export class EspeciePlantaDTO {
  static schema = z.object({
    nome_comum: z
      .string()
      .min(1, "Nome comum é obrigatório")
      .max(200, "Nome comum muito longo"),
    nome_cientifico: z
      .string()
      .min(1, "Nome científico é obrigatório")
      .max(200, "Nome científico muito longo"),
    tempo_colheita_dias: z
      .number()
      .int("Tempo de colheita deve ser inteiro")
      .min(1, "Tempo de colheita deve ser positivo"),
  });

  static updateSchema = EspeciePlantaDTO.schema.partial();

  static validate(input: unknown) {
    return EspeciePlantaDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return EspeciePlantaDTO.updateSchema.parse(input);
  }
}

export type EspeciePlantaInput = z.infer<typeof EspeciePlantaDTO.schema>;
export type EspeciePlantaUpdateInput = z.infer<
  typeof EspeciePlantaDTO.updateSchema
>;
