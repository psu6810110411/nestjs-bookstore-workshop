import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'; // 👈 1. Import เพิ่ม
import { Book } from '../../book/entities/book.entity';

@Entity()
export class BookCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  // (ถ้ามี description ก็ใส่ไว้เหมือนเดิมนะครับ)
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  // 👇👇 2. เพิ่ม 2 บรรทัดนี้ลงไปครับ
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  // 👆👆
}