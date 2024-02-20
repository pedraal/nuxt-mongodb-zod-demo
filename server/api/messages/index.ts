import { MessageRepository } from "~/db/message.repo"

export default defineEventHandler(async () => {
  const repo = new MessageRepository()
  const messages = await repo.getRecent()

  return { messages }
})
