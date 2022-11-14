import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubscriptionUserEntity } from '.';

@Entity({ name: 'subscriptions' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  createdAt?: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;

  @OneToMany(() => SubscriptionUserEntity, (subscriptionUser) => subscriptionUser.subscription)
  subscriptedUsers?: SubscriptionUserEntity[];

  constructor(data: SubscriptionEntity) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.price = data.price;
      this.description = data.description;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.deletedAt = data.deletedAt;
    }
  }
}
