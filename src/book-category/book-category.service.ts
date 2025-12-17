import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { BookCategory } from './entities/book-category.entity';

@Injectable()
export class BookCategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(BookCategory)
    private readonly repo: Repository<BookCategory>, // ✅ เปลี่ยนชื่อเป็น repo
  ) {}

  async onModuleInit() {
    const count = await this.repo.count(); 
    if (count === 0) {
      console.log('--- Seeding Initial Data ---');
      await this.repo.save([
        { name: 'Fiction', description: 'Stories and novels' },
        { name: 'Technology', description: 'Computers and tech' },
        { name: 'History', description: 'Past events' },
      ]);
    }
  }

  async create(createBookCategoryDto: CreateBookCategoryDto): Promise<BookCategory> {
    const newCategory = this.repo.create(createBookCategoryDto);
    return await this.repo.save(newCategory);
  }

  async findAll(): Promise<BookCategory[]> {
    return await this.repo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<BookCategory> {
    const category = await this.repo.findOneBy({ id });
    
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    
    return category;
  }

  async update(id: string, updateBookCategoryDto: UpdateBookCategoryDto): Promise<BookCategory> {
    const category = await this.findOne(id);
    Object.assign(category, updateBookCategoryDto);
    return await this.repo.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }
}