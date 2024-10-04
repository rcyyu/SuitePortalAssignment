import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthDao } from './auth.dao';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiry },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthDao, AuthService],
})
export class AuthModule {}
