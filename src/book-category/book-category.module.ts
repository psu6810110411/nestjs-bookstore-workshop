import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategory } from './entities/book-category.entity';
import { BookCategoryService } from './book-category.service';
import { BookCategoryController } from './book-category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookCategory]) 
  ],
  controllers: [BookCategoryController],
  providers: [BookCategoryService], 
  exports: [BookCategoryService]
})
export class BookCategoryModule {}