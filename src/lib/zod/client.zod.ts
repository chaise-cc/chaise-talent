import { z } from "zod";

// ZOD SCHEMA FOR TALENTS
export const clientSchema = z.object({});

// INFERRED TYPES FOR TALENTS
export type Client = z.infer<typeof clientSchema>;
