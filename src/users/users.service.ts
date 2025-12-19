import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ทำงานทันทีที่รัน Server: เช็คว่ามี Admin หรือยัง?
  async onModuleInit() {
    const admin = await this.findOneByEmail('admin@bookstore.com');
    if (!admin) {
      console.log('Seeding Admin User...');
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash('adminpassword', salt);

      await this.userRepository.save({
        email: 'admin@bookstore.com',
        password: hashedPassword,
        role: UserRole.ADMIN,
      } as any);
    }
  }

  // 👇 แก้ไขฟังก์ชัน create ให้เข้ารหัสก่อนบันทึก
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) { // เปลี่ยน id เป็น string ตาม entity
    return this.userRepository.findOneBy({ id });
  }

  // 👇 เพิ่มฟังก์ชันนี้สำหรับใช้ตอน Login
  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}