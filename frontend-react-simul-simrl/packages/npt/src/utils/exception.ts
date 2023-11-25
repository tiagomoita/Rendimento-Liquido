// Enums
import EErrorCodes from "../enums/error-codes";

/**
 * Custom Error for handling service errors
 * @export
 * @class Exception
 */
export default class Exception {
  public static readonly DEFAULT_CODE = EErrorCodes.DEFAULT_CODE;

  public static readonly DEFAULT_TITLE = "errors.titles.default";

  public static readonly DEFAULT_MESSAGE = "errors.messages.default";

  public readonly code: number;

  public readonly title: string;

  public readonly message: string;

  public readonly metadata: any;

  /**
   * Creates an instance of Exception.
   * @param {*} [error={}]
   * @memberof Exception
   */
  constructor(error: any = {}) {
    try {
      const {
        code = Exception.DEFAULT_CODE,
        message = Exception.DEFAULT_MESSAGE,
        ...rest
      } = { ...error };

      const { _code, _title, _message } = this.retrieveLocaleError(
        code,
        message
      );

      this.code = _code;
      this.title = _title;
      this.message = _message;
      this.metadata = rest;
    } catch (err) {
      this.code = Exception.DEFAULT_CODE;
      this.title = Exception.DEFAULT_TITLE;
      this.message = Exception.DEFAULT_MESSAGE;
    }
  }

  /**
   * TODO: Declare all Error codes here
   * Retrieves the error title according to the provided error code
   * @private
   * @param {number} code
   * @param {string} message
   * @memberof Exception
   */
  private retrieveLocaleError = (
    code: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    message: string
  ): {
    _code: number;
    _title: string;
    _message: string;
  } => {
    switch (code) {
      case EErrorCodes.NO_INTERNET_CONNECTION: {
        return {
          _code: code,
          _title: "exception.title",
          _message: "exception.connection",
        };
      }
      default:
        return {
          _code: code || Exception.DEFAULT_CODE,
          _title: Exception.DEFAULT_TITLE,
          _message: Exception.DEFAULT_MESSAGE,
        };
    }
  };
}
