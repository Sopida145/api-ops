import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class UpdatePatienceDto {
    @ApiPropertyOptional({ description: 'Name of the patience' })
    @IsString()
    @IsOptional()
    hn: string;
    @ApiPropertyOptional({ description: 'Name of the patience' })
    @IsString()
    @IsOptional()
    firstName: string;
    @ApiPropertyOptional({ description: 'Name of the patience' })
    @IsString()
    @IsOptional()
    lastName: string;
    @ApiPropertyOptional({ description: 'Name of the patience' })
    @IsString()
    @IsOptional()
    dob: string;
    @ApiPropertyOptional({ description: 'Name of the patience' })
    @IsString()
    @IsOptional()
    idCard: string;
    @ApiPropertyOptional({ description: 'Name of the patience' })
    @IsString()
    @IsOptional()
    phone: string;
    @ApiPropertyOptional({ description: 'Name of the patience' })
    @IsString()
    @IsOptional()
    Address: string;
    
}
