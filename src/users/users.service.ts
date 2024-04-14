import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { RESPONSE_MESSAGE } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/**
 *
 *
 * @export
 * @class UsersService
 */
@Injectable()
export class UsersService {
  /**
   *
   *
   * @private
   * @type {User[]}
   * @memberof UsersService
   */
  private users: User[];

  /**
   * Creates an instance of UsersService.
   * @memberof UsersService
   */
  constructor() {
    this.users = [];
  }

  /**
   * Function to create a new User.
   *
   * @param {CreateUserDto} createUserDto
   * @return {*}  {User}
   * @memberof UsersService
   */
  create(createUserDto: CreateUserDto): User {
    if (this.isEmailUsed(createUserDto.email)) throw new ConflictException(RESPONSE_MESSAGE.EMAIL_IN_USE);
    return this.createUser(createUserDto);
  }

  /**
   * Function to find all Users.
   *
   * @return {*}  {User[]}
   * @memberof UsersService
   */
  findAll(): User[] {
    return this.users.filter((user) => user.state);
  }

  /**
   * Function to find a User by ID
   *
   * @param {string} id
   * @return {*}  {User}
   * @memberof UsersService
   */
  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id && user.state === true);
    if (!user) throw new NotFoundException(RESPONSE_MESSAGE.USER_NOT_FOUND);
    return user;
  }

  /**
   * Function to update a User by ID
   *
   * @param {string} id
   * @param {UpdateUserDto} updateUserDto
   * @return {*}  {User}
   * @memberof UsersService
   */
  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    return _.assign(user, updateUserDto);
  }

  /**
   * Function to remove a User by ID
   *
   * @param {string} id
   * @memberof UsersService
   */
  remove(id: string): void {
    this.findOne(id);
    this.update(id, { state: false });
  }

  /**
   * Function to check if an email is already in use.
   *
   * @private
   * @param {string} email
   * @return {*}  {boolean}
   * @memberof UsersService
   */
  private isEmailUsed(email: string): boolean {
    return this.users.some((user) => user.email === email);
  }

  /**
   * Function to create a User.
   *
   * @private
   * @param {CreateUserDto} createUserDto
   * @return {*}  {User}
   * @memberof UsersService
   */
  private createUser(createUserDto: CreateUserDto): User {
    const user: User = {
      id: uuidv4(),
      state: true,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }
}
