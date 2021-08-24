import { CommonEntity } from '../../common/entities/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Order } from '../../orders/entities/order.entity';
import { Payment } from '../../payments/entities/payment.entity';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column({ select: false })
  @Field(() => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ type: Boolean, default: false })
  @Field(() => Boolean)
  verified: boolean;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  @Field(() => [Restaurant])
  restaurants: Restaurant[];

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.customer)
  orders: Order[];

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.driver)
  rides: Order[];

  @Field((type) => [Payment])
  @OneToMany((type) => Payment, (payment) => payment.user, { eager: true })
  payments: Payment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
      } catch (e) {
        throw new InternalServerErrorException();
      }
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(password): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(password, this.password);
      return ok;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
