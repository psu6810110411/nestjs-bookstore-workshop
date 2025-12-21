import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BookCategory } from '../../book-category/entities/book-category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  likeCount: number;

  @ManyToOne(() => BookCategory, (category) => category.books)
  category: BookCategory;

  @ManyToMany(() => User, (user) => user.likedBooks)
  @JoinTable()
  likedBy: User[];
}