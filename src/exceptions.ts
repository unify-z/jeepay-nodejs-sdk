class BaseException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class APIRequestException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}

export class APIResponseException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}

export class SDKException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
