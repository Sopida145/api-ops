import { ApiProperty } from '@nestjs/swagger';

import { 
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString, } from 'class-validator';


import { Matches } from 'class-validator';

export class CreatePatienceDto {
  
  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  hn: string;

  
  @ApiProperty({ description: 'Gender of the patience (male or female)' })
  @IsString()
  @IsEnum(['ชาย', 'หญิง'], { message: 'Gender must be either male or female' })
  gender: string;

  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  dob: string;
  
  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  idCard: string;

  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Phone must be a 10-digit number' })
  phone: string;
  
  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  Address: string;  
}