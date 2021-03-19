/* eslint-disable no-useless-return */
// Other packages
const path = require('path');

// Discord requires
const disc = require('discord.js');
const { BOT_TOKEN } = require('../dotenv');

// Discord setup
const client = new disc.Client();
client.login(BOT_TOKEN);

// Command prefix
const prefix = '=>';

// Services
const { DataHandler } = require('./services/DataHandler');
const { Quotes } = require('./services/Quotes');

// Data initialization
const dataHandler = new DataHandler(path.join(__dirname, 'data.json'));

// Quotes initialization
const quotes = new Quotes(dataHandler);

// Listening to Discord messages
client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const commandService = args.shift().toLowerCase();
  const commandAction = args.shift().toLowerCase();

  if (commandService === 'quote') {
    if (commandAction === 'new') {
      const author = args.shift();
      quotes.newQuote(author, args.join(' '));

      message.channel.send('New quote registered!');
    } else if (commandAction === 'random') {
      const author = args[0];
      const randomQuote = author ? quotes.quoteFromAuthor(author) : quotes.randomQuote();

      message.channel.send(`"${randomQuote.quote}" - ${randomQuote.author}`);
    } else if (commandAction === 'list') {
      const author = args[0];
      const list = (author ? quotes.listQuotesFromAuthor(author) : quotes.listQuotes())
        .reduce((acc, curr) => `${acc}${curr.author} - "${curr.quote}"\n`, '');

      message.channel.send(list);
    } else {
      const { author, quote } = quotes.quoteFromAuthor(args[0]);

      message.channel.send(`"${quote}" - ${author}`);
    }
  }
});
