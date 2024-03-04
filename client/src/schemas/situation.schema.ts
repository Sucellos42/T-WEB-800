import { z } from "zod"

export const SituationSchema = z.object({
  $id: z.string(),
  nom: z.string(),
})
