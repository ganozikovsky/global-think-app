import { Injectable } from '@nestjs/common';

/**
 * Service for Main Application Module.
 *
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
  /**
   * Get the application status.
   *
   * @return {*}  {object} - Application status.
   * @memberof AppService
   */
  getStatus(): object {
    return {
      message: 'OK.',
    };
  }
}
