import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id); // 👈 ใส่ + เพื่อแปลง string เป็น number
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/like') // 👈 เปลี่ยน endpoint เป็น like
  toggleLike(@Param('id') id: string, @Request() req) {
    // 👈 เรียก toggleLike และใส่ +id
    return this.bookService.toggleLike(+id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto); // 👈 ใส่ +
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id); // 👈 ใส่ +
  }
}