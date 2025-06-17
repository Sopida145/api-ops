import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInTokenDto {
  @ApiProperty({ description: 'Access token for the user' })
  @IsString()
  @IsNotEmpty({ message: 'Access token is required' })
  accessToken: string;
}
