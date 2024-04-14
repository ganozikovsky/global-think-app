import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserDto: CreateUserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    mockUserDto = { email: 'test@example.com', name: 'Test User', age: 22 };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a new user', () => {
      const result = service.create(mockUserDto);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('state', true);
      expect(result.email).toBe(mockUserDto.email);
      expect(result.name).toBe(mockUserDto.name);
    });

    it('should throw a ConflictException if the email is already in use', () => {
      service.create(mockUserDto);

      expect(() => service.create(mockUserDto)).toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an empty array when no users are present', () => {
      const results = service.findAll();
      expect(results).toEqual([]);
    });

    it('should return only active users when mixed user states exist', () => {
      const inactiveUserDto: CreateUserDto = { email: 'inactive@example.com', name: 'Inactive User', age: 22 };
      service.create(mockUserDto);
      const inactiveUser = service.create(inactiveUserDto);
      inactiveUser.state = false;

      const results = service.findAll();
      expect(results).toHaveLength(1);
      expect(results[0]).toMatchObject(mockUserDto);
    });
  });

  describe('findOne', () => {
    it('should successfully find an active user by ID', () => {
      const user = service.create(mockUserDto);
      const foundUser = service.findOne(user.id);

      expect(foundUser).toMatchObject(mockUserDto);
    });

    it('should throw a NotFoundException if no user with given ID exists', () => {
      expect(() => service.findOne('nonexistent-id')).toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if the user is found but inactive', () => {
      const inactiveUser = service.create(mockUserDto);
      inactiveUser.state = false;

      expect(() => service.findOne(inactiveUser.id)).toThrow(NotFoundException);
    });
  });
});
