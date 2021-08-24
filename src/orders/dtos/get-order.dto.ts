import { Order } from '../entities/order.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from '../../common/dtos/output.dto';

@InputType()
export class GetOrderInput extends PickType(Order, ['id']) {}

@ObjectType()
export class GetOrderOutput extends MutationOutput {
  @Field((type) => Order, { nullable: true })
  order?: Order;
}
