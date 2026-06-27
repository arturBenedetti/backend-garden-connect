import { z } from "zod";

export class AgendaDTO {
  static schema = z.object({
    tarefaId: z.string().min(1, "Id da tarefa é obrigatório"),
    data_hora: z.coerce.date(),
  });

  static updateSchema = AgendaDTO.schema.partial();

  static validate(input: unknown) {
    return AgendaDTO.schema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return AgendaDTO.updateSchema.parse(input);
  }
}

export type AgendaInput = z.infer<typeof AgendaDTO.schema>;
export type AgendaUpdateInput = z.infer<typeof AgendaDTO.updateSchema>;
