export class AuthKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthKeyError";
  }
}

export class ValueError extends Error {
  details?: Record<string, unknown>;
  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "ValueError";
    this.details = details;
  }
}

export class TypeValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TypeValidationError";
  }
}

export class ChiMoneyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChiMoneyError";
  }
}


