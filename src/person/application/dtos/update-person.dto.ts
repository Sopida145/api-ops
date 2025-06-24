import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class UpdatePersonDto {
  @ApiPropertyOptional({ description: 'Name of the person' })
  @IsString()
  @IsOptional()
  name: string;

  companyId: string;
}
