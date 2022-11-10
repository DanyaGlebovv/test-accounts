import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubscriptionUserEntity } from '.';

@Entity({ name: 'subscriptions' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  createdAt?: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;

  @OneToMany(() => SubscriptionUserEntity, (subscriptionUser) => subscriptionUser.subscription)
  subscriptedUsers: SubscriptionUserEntity[];
}
