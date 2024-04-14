import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { HTTP_STATUS_MESSAGE } from '../constants';

/**
 * Service to share common utils functions across Modules.
 *
 * @export
 * @class UtilsService
 */
@Injectable()
export class UtilsService {
  /**
   * Function to return Generic parsed Success Response.
   *
   * @param {(string[] | string)} messages - The messages to be returned in response.
   * @param {*} data - The data to be returned in response.
   * @return {object} - The parsed success response.
   */
  buildSuccessResponse = (message: string, data: any = null) => {
    return {
      status: HTTP_STATUS_MESSAGE.SUCCESS,
      message,
      ...(_.isEmpty(data) ? {} : { data }),
    };
  };

  /**
   * Function to return Generic parsed Failed Response.
   *
   * @param {string} message - The message to be returned in response.
   * @param {*} [{ data = {}, validationError = {} }={}] - The data and validationError to be returned in response.
   * @memberof UtilsService - The Utils Service.
   */
  buildFailedResponse = (message: string, { data = {}, validationError = {} } = {}) => {
    return {
      status: HTTP_STATUS_MESSAGE.FAILED,
      message,
      ...(_.isEmpty(data) ? {} : { data }),
      ...(_.isEmpty(validationError) ? {} : { validationError }),
    };
  };
}
