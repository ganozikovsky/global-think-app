import { Global, Module } from '@nestjs/common';

import { UtilsService } from './utils';

/**
 * Services for providing them Globally
 *
 * @type {[*]}
 */
const services = [UtilsService];

/**
 * Common module with services exposed for using globally.
 *
 * @export
 * @class CommonModule
 */
@Global()
@Module({
  imports: [],
  providers: services,
  exports: services,
})
export class CommonModule {}
