export class Quote {
  public author: string
  public line: string
  public date: Date

  constructor(props: Quote) {
    Object.assign(this, props)
  }
}
