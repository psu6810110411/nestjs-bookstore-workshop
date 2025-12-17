import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookCategoryModule } from './book-category/book-category.module';
import { BookCategory } from './book-category/entities/book-category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'chap1234', 
      database: 'bookstore_db', 
      entities: [BookCategory],
      synchronize: true,
    }),
    BookCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}