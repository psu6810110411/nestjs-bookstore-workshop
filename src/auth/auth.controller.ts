import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // 1. เช็คว่า Email/Password ถูกไหม
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    // 2. ถ้าไม่ถูก ให้แจ้ง Error
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. ถ้าถูก ให้สร้าง Token ส่งกลับไป
    return this.authService.login(user);
  }
}