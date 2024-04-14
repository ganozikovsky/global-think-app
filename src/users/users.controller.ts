import { UtilsService } from '@common/utils';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { RESPONSE_MESSAGE } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly utils: UtilsService,
  ) {}

  /**
   * Endpoint to create a new User.
   *
   * @param {CreateUserDto} createUserDto
   * @throws {ConflictException} If the email is already in use.
   * @return {*}  {object}
   * @memberof UsersController
   */
  @Post()
  @ApiCreatedResponse({ description: RESPONSE_MESSAGE.USER_CREATED })
  @ApiConflictResponse({ description: RESPONSE_MESSAGE.EMAIL_IN_USE })
  @ApiUnprocessableEntityResponse({ description: RESPONSE_MESSAGE.VALIDATION_ERROR })
  @ApiInternalServerErrorResponse({ description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR })
  create(@Body() createUserDto: CreateUserDto): object {
    const user = this.usersService.create(createUserDto);
    return this.utils.buildSuccessResponse('User created successfully', user);
  }

  /**
   * Endpoint to find all Users.
   *
   * @return {*}  {object}
   * @memberof UsersController
   */
  @Get()
  @ApiOkResponse({ description: RESPONSE_MESSAGE.USER_RETRIEVED })
  @ApiInternalServerErrorResponse({ description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR })
  findAll(): object {
    const users = this.usersService.findAll();
    return this.utils.buildSuccessResponse('Users retrieved successfully', users);
  }

  /**
   * Endpoint to find a User by ID.
   *
   * @param {string} id
   * @throws {NotFoundException} If the User is not found.
   * @return {*}  {object}
   * @memberof UsersController
   */
  @Get(':id')
  @ApiOkResponse({ description: RESPONSE_MESSAGE.USER_RETRIEVED })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.USER_NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR })
  findOne(@Param('id') id: string): object {
    const user = this.usersService.findOne(id);
    return this.utils.buildSuccessResponse('User retrieved successfully', user);
  }

  /**
   * Endpoint to update a User by ID.
   *
   * @param {string} id
   * @param {UpdateUserDto} updateUserDto
   * @throws {NotFoundException} If the User is not found.
   * @return {*}  {object}
   * @memberof UsersController
   */
  @Patch(':id')
  @ApiOkResponse({ description: RESPONSE_MESSAGE.USER_UPDATED })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.USER_NOT_FOUND })
  @ApiUnprocessableEntityResponse({ description: RESPONSE_MESSAGE.VALIDATION_ERROR })
  @ApiInternalServerErrorResponse({ description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): object {
    const user = this.usersService.update(id, updateUserDto);
    return this.utils.buildSuccessResponse('User updated successfully', user);
  }

  /**
   * Endpoint to delete a User by ID.
   *
   * @param {string} id
   * @throws {NotFoundException} If the User is not found.
   * @return {*}  {object}
   * @memberof UsersController
   */
  @Delete(':id')
  @ApiOkResponse({ description: RESPONSE_MESSAGE.USER_DELETED })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.USER_NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR })
  remove(@Param('id') id: string): object {
    this.usersService.remove(id);
    return this.utils.buildSuccessResponse('User deleted successfully');
  }
}
