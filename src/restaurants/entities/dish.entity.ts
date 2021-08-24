import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Category } from './category.entity';
import { Restaurant } from './restaurant.entity';
import { IsNumber, IsString, Length } from 'class-validator';

@InputType('DishChoiceInputType', { isAbstract: true })
@ObjectType()
export class DishChoice {
  @Field((type) => String)
  name: string;
  @Field((type) => Int, { nullable: true })
  extra?: number;
}

@InputType('DishOptionsInputType', { isAbstract: true })
@ObjectType()
class DishOptions {
  @Field(() => String)
  name: string;

  @Field(() => [DishChoice], { nullable: true })
  choices?: DishChoice[];

  @Field(() => Int, { nullable: true })
  extra?: number;
}

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CommonEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  photo: string;

  @Field((type) => String)
  @Column()
  @Length(5, 140)
  description: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  @Field(() => Restaurant)
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Field(() => [DishOptions], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOptions[];
}
