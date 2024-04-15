import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google-strategy';
import { UserService } from 'src/user/user.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  providers: [
    AuthService, 
    GoogleStrategy,
    JwtAccessStrategy,
    JwtAccessStrategy,
    UserService
  ],
  controllers: [AuthController],
  exports: [
    JwtAccessStrategy, 
    JwtAccessStrategy
  ]
})
export class AuthModule {}
