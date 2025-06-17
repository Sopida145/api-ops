import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from 'src/auth/domain/services/auth.service';
import { SignInTokenCommand } from './signin-token.command';
import { UnauthorizedException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';

@CommandHandler(SignInTokenCommand)
export class SignInTokenHandler implements ICommandHandler<SignInTokenCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(
    command: SignInTokenCommand,
  ): Promise<ResponseDto<{ accessToken: string }>> {
    const { accessToken } = command;
    const user = await this.authService.validateToken(accessToken);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // ออก Token ใหม่
    const newAccessToken = await this.authService.generateJwtToken(user);
    return new ResponseDto<{ accessToken: string }>({
      accessToken: newAccessToken,
    });
  }
}
