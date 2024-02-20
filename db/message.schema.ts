import { z } from 'zod'

export const message = z.object({
  username: z.string().min(3, 'Doit être plus long que 3 caractères').max(20, 'Doit être plus court que 20 caractères').trim(),
  content: z.string().min(1, 'Ne doit pas être vide').trim(),
})
export const messageDTO = z.object({ username: message.shape.username, content: message.shape.content }).strict()
export type MessageDTO = z.infer<typeof messageDTO>
