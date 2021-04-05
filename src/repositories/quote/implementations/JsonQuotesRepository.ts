import { Quote } from '../../../entities/Quote'
import { IQuotesRepository } from '../IQuotesRepository'

export class JsonQuotesRepository implements IQuotesRepository {
  private readonly quotes: Quote[]
  private static instance: JsonQuotesRepository

  private constructor() {
    this.quotes = []
  }

  public static getInstance(): JsonQuotesRepository {
    if (!JsonQuotesRepository.instance) {
      JsonQuotesRepository.instance = new JsonQuotesRepository()
    }

    return JsonQuotesRepository.instance
  }

  async save(quote: Quote): Promise<void> {
    this.quotes.push(quote)
  }

  async findRandom(): Promise<Quote> {
    const { length } = this.quotes
    const randomInt = Math.floor(Math.random() * (length - 0) + 0)

    return this.quotes[randomInt]
  }

  async findRandomByAuthor(author: string): Promise<Quote> {
    const authorQuotes = this.filterQuotesFromAuthor(author)
    const { length } = authorQuotes

    const randomInt = Math.floor(Math.random() * (length - 0) + 0)

    return authorQuotes[randomInt]
  }

  async findAll(): Promise<Quote[]> {
    return JsonQuotesRepository.sortQuotes(this.quotes, 1)
  }

  async findAllByAuthor(author: string): Promise<Quote[]> {
    const authorQuotes = this.filterQuotesFromAuthor(author)

    return JsonQuotesRepository.sortQuotes(authorQuotes, 1)
  }

  filterQuotesFromAuthor(author: string): Quote[] {
    const regex = new RegExp(author, 'i')
    const authorQuotes = this.quotes.filter((val) => regex.test(val.author))

    return authorQuotes
  }

  static sortQuotes(quotes: Quote[], order: 1 | -1): Quote[] {
    const arr = [...quotes]

    arr.sort((a, b) => {
      if (a.author.toLowerCase() > b.author.toLowerCase()) {
        return order
      }
      if (a.author.toLowerCase() < b.author.toLowerCase()) {
        return -1 * order
      }
      if (a.line.toLowerCase() > b.line.toLowerCase()) {
        return order
      }
      if (a.line.toLowerCase() < b.line.toLowerCase()) {
        return -1 * order
      }
      return 0
    })

    return arr
  }
}
