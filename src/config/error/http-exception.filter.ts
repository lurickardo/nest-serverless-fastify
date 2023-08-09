import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ExceptionDto } from './exception.dto';

@Catch(ExceptionDto)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ExceptionDto, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error.';

    if (exception.typeError !== 'HttpException') console.error(exception.error);

    if (exception.typeError === 'HttpException') {
      statusCode = exception.error.status;
      message = exception.error.response;
    }

    response.status(statusCode).send({
      statusCode: statusCode,
      message: message,
      timestamp: new Date(),
    });
  }
}
