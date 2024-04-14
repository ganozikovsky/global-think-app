import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import * as _ from 'lodash';

import { HTTP_STATUS_MESSAGE } from '../constants';
import { UtilsService } from '../utils';

/**
 * Custom exception filter for handling HTTP exceptions.
 *
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Private variable for Utils.
   *
   * @private
   * @type {UtilsService}
   * @memberof HttpExceptionFilter
   */
  private utils: UtilsService = new UtilsService();

  /**
   * Function for catching exceptions.
   *
   * @param {*} exception
   * @param {ArgumentsHost} host
   * @memberof HttpExceptionFilter
   */
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let responsePayload = {};

    // Handle Not Found Exception (404)
    if (exception instanceof NotFoundException) {
      responsePayload = this.utils.buildFailedResponse(exception.message || 'Record not found');
    }

    // Handle Bad Request Exception (400) as Unprocessable entity
    else if (exception instanceof BadRequestException) {
      status = 422;
      responsePayload = {
        status: HTTP_STATUS_MESSAGE.FAILED,
        message: 'Unprocessable entity',
        validationError: {
          message: _.get(exception, 'response.message', ''),
        },
      };
    }
    // Handle Unknown Exception (500)
    else {
      responsePayload = this.utils.buildFailedResponse(exception.message);
    }
    response.status(status).json(responsePayload);
  }
}
