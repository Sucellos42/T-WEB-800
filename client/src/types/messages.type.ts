import { z } from 'zod';
import { MessageSchema } from '~/schemas/messages.schema';

export type ZodMessage = z.infer<typeof MessageSchema>;
