import { CreateQuoteValidator } from './CreateQuoteValidator'
import { CreateQuoteUseCase } from './CreateQuoteUseCase'
import { Message } from 'discord.js'

export class CreateQuoteController {
  constructor(
    private readonly createQuoteUseCase: CreateQuoteUseCase,
    private readonly createQuoteValidator: CreateQuoteValidator,
  ) {}

  async handle(message: Message): Promise<string> {
    const author = args.shift() ?? ''
    const line = args.join(' ')
    const date = new Date()

    const quote = {
      author,
      line,
      date,
    }

    try {
      this.createQuoteValidator.validate(quote)

      await this.createQuoteUseCase.execute({
        author,
        line,
        date,
      })

      return 'Quote successfully created!'
    } catch (err) {
      return err.message
    }
  }
}
