import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  // @ApiPropertyOptional({ description: 'Name of the note' })
  // @IsString()
  // @IsOptional()
  // name: string;

  @ApiPropertyOptional({ description: 'Hospital number' })
  @IsString()
  @IsOptional()
  hn: string;

  @ApiPropertyOptional({ description: 'Blood pressure' })
  @IsString()
  @IsOptional()
  bloodPressure: string;

  @ApiPropertyOptional({ description: 'Subjective' })
  @IsString()
  @IsOptional()
  s: string;

  @ApiPropertyOptional({ description: 'Objective' })
  @IsString()
  @IsOptional()
  o: string;

  @ApiPropertyOptional({ description: 'Assessment' })
  @IsString()
  @IsOptional()
  a: string;

  @ApiPropertyOptional({ description: 'Plan' })
  @IsString()
  @IsOptional()
  p: string;

//  @ApiPropertyOptional({ description: 'Visit date (format: DD/MM/YYYY)', type: String })
//  @IsString()
//  @IsOptional()
//  visitDate: string;


}
