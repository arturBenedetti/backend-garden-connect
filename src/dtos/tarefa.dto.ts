import { z } from "zod";

export class TarefaDTO {
  static schema = z.object({
    descricao: z
      .string()
      .trim()
      .min(1, "Descrição é obrigatória")
      .max(500, "Descrição deve ter no máximo 500 caracteres"),
    prioridade: z.enum(["baixa", "media", "alta"], {
      message: "Prioridade deve ser: baixa, media ou alta",
    }),
    status: z.enum(["pendente", "em_andamento", "concluida", "cancelada"], {
      message: "Status deve ser: pendente, em_andamento, concluida ou cancelada",
    }),
    userId: z.string().min(1, "Id do utilizador é obrigatório"),
    canteiroId: z.string().min(1, "Id do canteiro é obrigatório"),
  });

  static updateSchema = TarefaDTO.schema.partial();

  static validate(input: unknown) {
    return TarefaDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return TarefaDTO.updateSchema.parse(input);
  }
}

export type TarefaInput = z.infer<typeof TarefaDTO.schema>;
export type TarefaUpdateInput = z.infer<typeof TarefaDTO.updateSchema>;
