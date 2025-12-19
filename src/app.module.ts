import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookCategoryModule } from './book-category/book-category.module';
import { BookModule } from './book/book.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123', 
      database: 'bookstore_dev', 
      
      // 👇 แก้ตรงนี้ครับ: ลบ entities [...] ทิ้ง แล้วใช้ autoLoadEntities แทน
      autoLoadEntities: true, 
      synchronize: true,
      dropSchema: true,
    }),
    BookCategoryModule,
    BookModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}