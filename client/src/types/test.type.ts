import { z } from "zod"
import { TestSchema } from "~/schemas/test.schema"

export type ZodTest = z.infer<typeof TestSchema>
