import { JsonQuotesRepository } from '../../../repositories/quote/implementations/JsonQuotesRepository'
import { CreateQuoteController } from './CreateQuoteController'
import { CreateQuoteUseCase } from './CreateQuoteUseCase'
import { CreateQuoteValidator } from './CreateQuoteValidator'

const jsonQuotesRepository = JsonQuotesRepository.getInstance()

const createQuoteValidator = new CreateQuoteValidator()
const createQuoteUseCase = new CreateQuoteUseCase(jsonQuotesRepository)

const createQuoteController = new CreateQuoteController(
  createQuoteUseCase,
  createQuoteValidator,
)

export { createQuoteUseCase, createQuoteController }
