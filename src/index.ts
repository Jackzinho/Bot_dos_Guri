// Other packages
import path from 'path'

// Discord requires
import { Client } from 'discord.js'
import { BOT_TOKEN } from './dotenv'

// Services
import { DataHandler } from './services/DataHandler/DataHandler'

// Discord import
const client = new Client()

// Command prefix
const prefix = '=>'

// Services initialization
const dataHandler = new DataHandler(path.join(__dirname, 'data.json'))

// Listening to Discord messages
client.on('message', async (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(' ')
  const commandService = args.shift().toLowerCase()
  const commandAction = args.shift().toLowerCase()

  if (commandService === 'quote') {
    if (commandAction === 'new') {
      const author = args.shift()
      await quotes.newQuote(author, args.join(' '))

      message.channel.send('New quote registered!')
    } else if (commandAction === 'random') {
      const author = args[0]
      const randomQuote = author
        ? quotes.quoteFromAuthor(author)
        : quotes.randomQuote()

      message.channel.send(`"${randomQuote.quote}" - ${randomQuote.author}`)
    } else if (commandAction === 'list') {
      const author = args[0]
      const list = (author
        ? quotes.listQuotesFromAuthor(author)
        : quotes.listQuotes()
      ).reduce((acc, curr) => `${acc}${curr.author} - "${curr.quote}"\n`, '')

      message.channel.send(list)
    } else {
      const { author, quote } = quotes.quoteFromAuthor(args[0])

      message.channel.send(`"${quote}" - ${author}`)
    }
  }
})

client.login(BOT_TOKEN)
