import { Quote } from '../../entities/Quote'

export interface IQuotesRepository {
  findAll: () => Promise<Quote[]>
  findAllByAuthor: (author: string) => Promise<Quote[]>
  findRandom: () => Promise<Quote>
  findRandomByAuthor: (author: string) => Promise<Quote>
  save: (quote: Quote) => Promise<void>
}
