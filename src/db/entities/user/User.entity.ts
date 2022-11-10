import { SubscriptionUserEntity } from '..';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pOnePersonId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  optOutAt?: string;

  @Column({ nullable: true })
  createdAt?: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;

  @OneToMany(() => SubscriptionUserEntity, (subscription) => subscription.user)
  subscriptions: SubscriptionUserEntity[];

  constructor(data: UserEntity) {
    if (data) {
      this.id = data.id;
      this.pOnePersonId = data.pOnePersonId;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.title = data.title;
      this.avatar = data.avatar;
    }
  }
}
