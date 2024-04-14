import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

/**
 *
 *
 * @export
 * @class CreateUserDto
 */
export class CreateUserDto {
  @ApiProperty({ example: 'Gonzalo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'gonzalo@mail.com', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 25 })
  @IsInt()
  @Min(1)
  @Max(120)
  @IsNotEmpty()
  age: number;
}
