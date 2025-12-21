import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity'; // 👈 1. Import User เข้ามา

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find({ relations: ['category'] });
  }

  findOne(id: number) { // 👈 ปรับเป็น number ให้ตรงกับ Controller (ถ้า Controller ส่ง string มา เดี๋ยวเราแปลงเอา)
    return this.bookRepository.findOne({ 
        where: { id },
        relations: ['category'] 
    });
  }

  // 👇👇 ฟังก์ชันพระเอกของเรา (แทนที่ incrementLikes เดิม)
  async toggleLike(bookId: number, userId: string) {
    // 1. ค้นหาหนังสือ พร้อมดึงคนที่เคยกดไลก์ (likedBy) มาดูด้วย
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['likedBy'], 
    });

    if (!book) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    // 2. เช็คว่า User คนนี้ (userId) อยู่ในรายการคนที่กดไลก์ไหม?
    const userIndex = book.likedBy.findIndex((user) => user.id === userId);

    if (userIndex >= 0) {
      // ✅ กรณีเจอมือดี (เคยกดแล้ว) -> ให้ "เอาออก" (Unlike)
      book.likedBy.splice(userIndex, 1);
      book.likeCount = Math.max(0, book.likeCount - 1); // ลดจำนวนไลก์ (ห้ามติดลบ)
    } else {
      // ❌ กรณีขาจร (ยังไม่เคยกด) -> ให้ "เพิ่มเข้า" (Like)
      // (เรา Cast object { id: userId } เป็น User เพื่อให้ TypeORM รู้จัก โดยไม่ต้อง query User จริงๆ)
      book.likedBy.push({ id: userId } as User);
      book.likeCount++; // เพิ่มจำนวนไลก์
    }

    // 3. บันทึกการเปลี่ยนแปลงลงฐานข้อมูล
    return this.bookRepository.save(book);
  }
  // 👆👆

  update(id: number, updateBookDto: UpdateBookDto) { return `This action updates a #${id} book`; }
  remove(id: number) { return `This action removes a #${id} book`; }
}