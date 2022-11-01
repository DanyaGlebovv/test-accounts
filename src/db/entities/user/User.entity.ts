import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  optOutAt?: string;

  @Column({ nullable: true })
  createdAt?: string;

  @Column({ nullable: true })
  udatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
