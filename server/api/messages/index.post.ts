import { ZodError } from 'zod'
import { MessageRepository } from '~/db/message.repo'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ username: string, content: string }>(event)
    const repo = new MessageRepository()
    const message = await repo.create(body)
    return { message }
  }
  catch (error) {
    if (error instanceof ZodError) {
      const formatedError = (error as ZodError).format()
      sendError(event, createError({ status: 422, data: formatedError }))
    }
    else {
      sendError(event, createError('Une erreur est survenue'))
    }
  }
})
