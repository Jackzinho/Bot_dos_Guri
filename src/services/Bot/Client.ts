import consola, { Consola } from 'consola'
import { Client, MessageEmbedOptions, Message, Intents } from 'discord.js'
import { promisify } from 'util'
import glob from 'glob'

const globPromise = promisify(glob)

export class Bot extends Client {
  public logger: Consola = consola

  constructor() {
    super({
      ws: { intents: Intents.ALL },
      messageCacheLifetime: 180,
      messageCacheMaxSize: 200,
      messageEditHistoryMaxSize: 200,
      messageSweepInterval: 180,
    })
  }
}
