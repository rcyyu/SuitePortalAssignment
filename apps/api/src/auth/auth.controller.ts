import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from '@suiteportal/api-interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    //
  }

  @Post('/login')
  public async login(
    @Body() loginRequest: LoginRequest,
    @Res() res
  ): Promise<LoginResponse> {
    if (!loginRequest?.email) {
      throw new BadRequestException('No email provided');
    }
    if (!loginRequest?.password) {
      throw new BadRequestException('No password provided');
    }

    const authentication = await this.authService.authenticate(
      loginRequest,
      res
    );

    if (!authentication || !authentication.sessionToken || !authentication.isAuthenticated) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return res.send(authentication);
  }
}
