import { Quote } from '../../../entities/Quote'
import { IQuotesRepository } from '../../../repositories/quote/IQuotesRepository'
import { ICreateQuoteDTO } from './ICreateQuoteDTO'

export class CreateQuoteUseCase {
  constructor(private readonly quotesRepository: IQuotesRepository) {}

  async execute(data: ICreateQuoteDTO): Promise<void> {
    await this.quotesRepository.save(new Quote(data))
  }
}
