import { ApiProperty } from '@nestjs/swagger';
import { 
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString, } from 'class-validator';

export class CreatePatienceDto {
  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  hn: string;
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
  phone: string;
  @ApiProperty({ description: 'Name of the patience' })
  @IsString()
  Address: string;  
}