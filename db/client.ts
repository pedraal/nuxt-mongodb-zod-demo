import { MongoClient } from 'mongodb'

export class DBClient {
  static mongoClient: MongoClient

  static async connect(url: string) {
    if (this.mongoClient) return

    this.mongoClient = new MongoClient(url)
    await this.mongoClient.connect()
  }

  static get db() {
    if (!this.mongoClient) throw new Error('Mongo client not connected')
    return this.mongoClient.db()
  }
}
