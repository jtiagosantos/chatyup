export class InvalidPasswordError extends Error {
  constructor() {
    super('Senha inválida');
  }
}
