export default class RegisterException extends Error {
  constructor(type, name, errors) {
    this.message = `Could not register "${type}" - "${name}".`;

    for (let error of errors) {
      this.message += "\n - " + error;
    }

    this.message += "\n";
  }
}
