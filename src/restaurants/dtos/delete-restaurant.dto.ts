import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteRestaurantInput {
  @Field(() => Number)
  restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends MutationOutput {}
