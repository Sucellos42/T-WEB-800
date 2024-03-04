import { z } from "zod"

export const TestSchema = z.object({
    nom: z.string(),
    age: z.number().nullable().optional(),
})
