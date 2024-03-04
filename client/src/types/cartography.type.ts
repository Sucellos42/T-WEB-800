import { z } from "zod"
import { CartographySchema } from "~/schemas/cartography.schema"

export type ZodCartography = z.infer<typeof CartographySchema>
