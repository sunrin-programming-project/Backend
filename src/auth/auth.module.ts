import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google-strategy';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  providers: [
    AuthService, 
    GoogleStrategy,
    JwtStrategy,
    UserService
  ],
  controllers: [AuthController],
  exports: [
    JwtStrategy
  ]
})
export class AuthModule {}
