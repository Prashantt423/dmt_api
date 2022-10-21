export class CustomError extends Error {
    statusCode;
    constructor(status: number, message: string) {
      super(message);
      this.statusCode = status? status: 500;
      // 👇️ because we are extending a built-in class
      Object.setPrototypeOf(this, CustomError.prototype);
    }

    getErrorMessage() {
      return 'Something went wrong: ' + this.message;
    }
}
