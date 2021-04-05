import { ICreateQuoteDTO } from './ICreateQuoteDTO'

export class CreateQuoteValidator {
  validate(data: ICreateQuoteDTO): void {
    if (!data.author) throw new Error('Author is invalid!')
    if (!data.line) throw new Error('Line is invalid!')
  }
}
