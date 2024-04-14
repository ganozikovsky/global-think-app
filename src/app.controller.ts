import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

/**
 * The AppController is the main entry point for the application.
 *
 * @export
 * @class AppController
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * This methods returns the status of the application.
   *
   * @return {*}  {object}
   * @memberof AppController
   */
  @ApiTags('App')
  @Get('status')
  getStatus(): object {
    return this.appService.getStatus();
  }
}
