import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray } from 'class-validator';

export class CreateNoteDto {
  // @ApiProperty({ description: 'Name of the note' })
  // @IsString()
  // name: string;

  @ApiProperty({ description: 'Hospital number' })
  @IsString()
  hn: string;

  // @ApiProperty({ description: 'Blood pressure' })
  // @IsString()
  // bloodPressure: string;

  // @ApiProperty({ description: 'Subjective' })
  // @IsString()
  // s: string;

  // @ApiProperty({ description: 'Objective' })
  // @IsString()
  // o: string;

  // @ApiProperty({ description: 'Assessment' })
  // @IsString()
  // a: string;

  // @ApiProperty({ description: 'Plan' })
  // @IsString()
  // p: string;

  // @ApiProperty({ description: 'Visit date', type: String, format: 'date' })
  // @IsString()
  // visitDate: string;

 
}