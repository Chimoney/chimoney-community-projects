class ChiMoneyError extends Error {
  constructor(message = "Chi Money Error") {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValueError extends ChiMoneyError {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
    this.name = this.constructor.name;
  }
}

class TypeError extends ChiMoneyError {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
    this.name = this.constructor.name;
  }
}

class AuthKeyError extends ChiMoneyError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports = {
  ChiMoneyError,
  ValueError,
  AuthKeyError,
  TypeError,
};
