import { UserEntity } from '..';
import { SubscriptionEntity } from '.';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'subscription_user' })
export class SubscriptionUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  expireAt?: string;

  @Column({ nullable: true })
  createdAt?: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => SubscriptionEntity)
  @JoinColumn()
  subscription: SubscriptionEntity;
}
