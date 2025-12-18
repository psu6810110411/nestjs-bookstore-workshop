import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

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
    // ดึงข้อมูลหนังสือ พร้อมโชว์หมวดหมู่ (category)
    return this.bookRepository.find({ relations: ['category'] });
  }

  findOne(id: string) {
    return this.bookRepository.findOne({ 
        where: { id },
        relations: ['category'] 
    });
  }

  // ฟังก์ชันเพิ่มยอด Like
  async incrementLikes(id: string) {
    const book = await this.findOne(id);
    if(book) {
        book.likeCount += 1;
        return this.bookRepository.save(book);
    }
    return null;
  }

  update(id: number, updateBookDto: UpdateBookDto) { return `This action updates a #${id} book`; }
  remove(id: number) { return `This action removes a #${id} book`; }
}