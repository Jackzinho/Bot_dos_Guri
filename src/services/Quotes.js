class Quotes {
  constructor(dataHandler) {
    this.dataHandler = dataHandler;
    this.quotes = dataHandler.data.quotes || [];
  }

  async newQuote(author, quote) {
    try {
      this.quotes.push({ author, quote });

      this.dataHandler.data = { quotes: this.quotes };
      await this.dataHandler.save();
    } catch (err) {
      console.error(err);
    }
  }

  randomQuote() {
    const { length } = this.quotes;
    const randomInt = Math.floor(Math.random() * (length - 0) + 0);

    return this.quotes[randomInt];
  }

  quoteFromAuthor(author) {
    const authorQuotes = this.filterQuotesFromAuthor(author);
    const { length } = authorQuotes;

    const randomInt = Math.floor(Math.random() * (length - 0) + 0);

    return authorQuotes[randomInt];
  }

  listQuotes() {
    return this.constructor.sortQuotes(this.quotes, 1);
  }

  listQuotesFromAuthor(author) {
    const authorQuotes = this.filterQuotesFromAuthor(author);

    return this.constructor.sortQuotes(authorQuotes, 1);
  }

  filterQuotesFromAuthor(author) {
    const regex = new RegExp(author, 'i');
    const authorQuotes = this.quotes.filter((val) => regex.test(val.author));

    return authorQuotes;
  }

  static sortQuotes(quotes, order) {
    const arr = [...quotes];

    arr.sort((a, b) => {
      if (a.author.toLowerCase() > b.author.toLowerCase()) {
        return order;
      }
      if (a.author.toLowerCase() < b.author.toLowerCase()) {
        return -1 * order;
      }
      if (a.quote.toLowerCase() > b.quote.toLowerCase()) {
        return order;
      }
      if (a.quote.toLowerCase() < b.quote.toLowerCase()) {
        return -1 * order;
      }
      return 0;
    });

    return arr;
  }
}

module.exports = { Quotes };
