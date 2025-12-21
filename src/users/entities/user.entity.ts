import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

// 👇 ประกาศ Enum ไว้ตรงนี้เลยครับ จะได้เรียกใช้ได้
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  // 👇 ส่วนที่เพิ่มมาใหม่
  @ManyToMany(() => Book, (book) => book.likedBy)
  likedBooks: Book[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}