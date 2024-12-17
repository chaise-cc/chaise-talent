import { z } from "zod";

// ZOD SCHEMA FOR TALENTS
export const talentSchema = z.object({});

// INFERRED TYPES FOR TALENTS
export type Talent = z.infer<typeof talentSchema>;
