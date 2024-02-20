/* eslint-disable no-console */
import { DBClient } from '~/db/client'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  try {
    await DBClient.connect(config.mongoUrl)

    console.log('[DB] connection established.')
  }
  catch (err) {
    console.error('[DB] connection failed.', err)
  }
})
