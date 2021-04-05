import { existsSync, readFileSync, writeFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import { QuoteArray } from '../Quotes/IQuotes'
import { IDataObject } from './IDataHandler'

type DataObjectFields = 'quotes'
type DataObjectTypes = QuoteArray

export class DataHandler {
  readonly dataPath: string
  dataObject: IDataObject

  constructor(dataPath: string) {
    this.dataPath = dataPath
    this.dataObject = {
      quotes: [],
    }

    if (!existsSync(this.dataPath)) {
      writeFileSync(this.dataPath, JSON.stringify({}))
    } else {
      const file = readFileSync(this.dataPath, { encoding: 'utf-8' })

      this.dataObject = JSON.parse(file)
    }
  }

  async save(): Promise<void> {
    await writeFile(this.dataPath, JSON.stringify(this.dataObject, null, ' '))
  }

  newData(field: DataObjectFields, data: DataObjectTypes): void {
    this.dataObject[field] = data
  }

  getDataFromField(field: DataObjectFields): DataObjectTypes {
    return this.dataObject[field]
  }
}
