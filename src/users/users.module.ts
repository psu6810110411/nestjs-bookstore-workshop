import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 1. เพิ่มบรรทัดนี้
import { User } from './entities/user.entity';     // 👈 2. เพิ่มบรรทัดนี้

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 3. ใส่บรรทัดนี้เพื่อให้ Service รู้จักตาราง User
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 👈 4. ใส่บรรทัดนี้เตรียมไว้สำหรับ Lab หน้า (Auth)
})
export class UsersModule {}