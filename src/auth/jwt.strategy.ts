import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // อ่าน Token จาก Header
      ignoreExpiration: false, // ถ้าหมดอายุให้ error เลย
      secretOrKey: 'mySuperSecretKey123', // 👈 ต้องตรงกับใน AuthModule เป๊ะๆ!
    });
  }

  async validate(payload: any) {
    // ถ้า Token ถูกต้อง ข้อมูลในนี้จะถูกส่งไปให้ Controller ใช้งานต่อ
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}