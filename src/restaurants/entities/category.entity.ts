import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, Length } from 'class-validator';
import { CommonEntity } from '../../common/entities/common.entity';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CommonEntity {
  @Column({ unique: true })
  @Field((type) => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => String)
  coverImg: string;

  @Column({ unique: true })
  @Field(() => String)
  slug: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  @Field(() => [Restaurant])
  restaurants: Restaurant[];
}
