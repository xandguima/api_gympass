export class UserAlredyExists extends Error {
  constructor() {
    super('E-mail alredy exists.')
  }
}
