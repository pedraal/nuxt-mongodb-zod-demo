import type { z } from 'zod'
import { type MessageDTO, type message, messageDTO } from './message.schema'
import { type BaseModel, BaseRepository } from './base.repo'

export type MessageModel = z.infer<typeof message> & BaseModel

export class MessageRepository extends BaseRepository<MessageModel> {
  constructor() {
    super('messages')
    this.collection.createIndex({ chatRoomId: 1 }, { unique: false })
  }

  async create(dto: MessageDTO) {
    const candidate = messageDTO.parse(dto)
    const document = this.initDocument(candidate)
    await this.collection.insertOne(document)
    return document as MessageModel
  }

  async getRecent() {
    return await this.collection.find({}, { sort: { createdAt: -1 }, limit: 10 }).toArray()
  }
}
