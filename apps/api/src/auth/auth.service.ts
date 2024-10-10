import { Injectable } from '@nestjs/common';
import { AuthDao } from './auth.dao';
import { LoginRequest, LoginResponse } from '@suiteportal/api-interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private static SESSION_COOKIE_KEY = 'session';

  constructor(
    private readonly authDao: AuthDao,
    private jwtService: JwtService
  ) {
    //
  }

  async authenticate(
    loginRequest: LoginRequest,
    res: any
  ): Promise<LoginResponse> {
    const userLogin = await this.authDao.getUserLogin(loginRequest.email);

    // TODO: realistically decrypt db password
    const success = userLogin && loginRequest.password == userLogin.password;

    if (success) {
      const payload = {
        id: userLogin.id,
        email: userLogin.email,
        name: userLogin.name,
        isAdmin: userLogin.isAdmin,
      };
      const sessionToken = await this.jwtService.signAsync(payload);
      res.cookie(AuthService.SESSION_COOKIE_KEY, {
        sessionToken: sessionToken,
        isAdmin: userLogin.isAdmin,
      });
      return {
        sessionToken,
        isAuthenticated: true,
        isAdmin: userLogin.isAdmin,
      };
    }

    return { sessionToken: null, isAuthenticated: false, isAdmin: false };
  }
}
