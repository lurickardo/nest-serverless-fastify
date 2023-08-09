export class ExceptionDto {
  constructor(
    private readonly _error,
    private readonly _typeError: string = _error.constructor.name,
  ) {}

  get error() {
    return this._error;
  }

  get typeError(): string {
    return this._typeError;
  }
}
