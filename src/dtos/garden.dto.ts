import { z } from "zod";

export const gardenSchema = z.object({
  name: z.string().min(1, "Name is mandatory").max(100, "Name is too long"),
  localization: z.string().min(1, "Localization is mandatory").max(100, "Name is too long")
});
export type GardenInput = z.infer<typeof gardenSchema>;
export const GardenUpdateSchema = gardenSchema.partial();
export type GardenUpdateInput = z.infer<typeof GardenUpdateSchema>;
