import { z } from "zod"
import { SituationSchema } from "~/schemas/situation.schema"

export const OrganSchema = z.object({
  $id: z.string(),
  nom: z.string(),
  situations: SituationSchema.array().nullable().optional(),
})
