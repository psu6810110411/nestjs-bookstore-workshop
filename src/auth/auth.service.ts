import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // 👈 อย่าลืม Import ตัวนี้

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. ฟังก์ชันเช็ค User และ Password
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    
    // ถ้ามี User และรหัสผ่านถูกต้อง (ใช้ bcrypt เช็ค)
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // ตัด field password ออกก่อนส่งกลับ
      return result;
    }
    return null;
  }

  // 2. ฟังก์ชัน Login เพื่อสร้าง Token
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // 👈 สร้าง JWT ตรงนี้
    };
  }
}