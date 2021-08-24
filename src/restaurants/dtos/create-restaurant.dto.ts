import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';
import { MutationOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'address',
  'name',
  'coverImg',
]) {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends MutationOutput {}
