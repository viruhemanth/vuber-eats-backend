import { Field, InputType, Int, Mutation, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from './output.dto';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;
}

@ObjectType()
export class PaginationOutput extends MutationOutput {
  @Field(() => Int, { nullable: true })
  totalPages?: number;

  @Field(() => Int, { nullable: true })
  totalResults?: number;
}
