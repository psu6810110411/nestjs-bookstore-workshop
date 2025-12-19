import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // ตั้งค่า JWT ให้โหลด Secret จาก .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
     useFactory: async () => ({
        secret: 'mySuperSecretKey123',
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, // 👈 (Step 2.5 ค่อยเปิด)
  ],
  exports: [AuthService],
})
export class AuthModule {}