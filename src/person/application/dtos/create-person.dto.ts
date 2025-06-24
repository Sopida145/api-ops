import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsDate, IsOptional, isEnum, isString } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ description: 'Name of the person' })
  @IsString()
  name: string;

@ApiProperty({ description: 'Birthdate of the person', type: Date, format: 'date' })
@IsOptional()
@IsDate()
birthdate: Date;

@ApiProperty({ description: 'Gender of the person', enum: ['male', 'female', 'other'] })
@IsOptional()
@IsString()
gender:string;

companyId: string;
  
}