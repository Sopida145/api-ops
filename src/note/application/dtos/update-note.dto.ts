import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  // @ApiPropertyOptional({ description: 'Name of the note' })
  // @IsString()
  // @IsOptional()
  // name: string;

  @ApiPropertyOptional({ description: 'Hospital number' })
  @IsString()
  hn: string;

  @ApiPropertyOptional({ description: 'Blood pressure' })
  @IsString()
  bloodPressure: string;

  @ApiPropertyOptional({ description: 'Subjective' })
  @IsString()
  s: string;

  @ApiPropertyOptional({ description: 'Objective' })
  @IsString()
  o: string;

  @ApiPropertyOptional({ description: 'Assessment' })
  @IsString()
  a: string;

  @ApiPropertyOptional({ description: 'Plan' })
  @IsString()
  p: string;

    @ApiPropertyOptional({ description: 'Visit date', type: String, format: 'date' })
    @IsString()
    visitDate: string;

  companyId: string;
}
