import { z } from "zod";

export class PlantioDTO {
  static schema = z.object({
    canteiroId: z.string().min(1, "Id do canteiro é obrigatório"),
    especieId: z.string().min(1, "Id da espécie é obrigatório"),
    data_inicio: z.coerce.date(),
    status: z.enum(["ativo", "colhido", "cancelado"], {
      message: "Status deve ser: ativo, colhido ou cancelado",
    }),
  });

  static updateSchema = PlantioDTO.schema.partial();

  static validate(input: unknown) {
    return PlantioDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return PlantioDTO.updateSchema.parse(input);
  }
}

export type PlantioInput = z.infer<typeof PlantioDTO.schema>;
export type PlantioUpdateInput = z.infer<typeof PlantioDTO.updateSchema>;
