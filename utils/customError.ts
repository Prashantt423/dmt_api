export class CustomError extends Error {
    statusCode = 500;
  
    constructor(status: number, message: string) {
      super(message);
  
      this.statusCode = status | 500;
  
      // 👇️ because we are extending a built-in class
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  
    getErrorMessage() {
      return 'Something went wrong: ' + this.message;
    }
}
