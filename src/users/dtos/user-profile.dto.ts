import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class UserProfileOutput extends MutationOutput {
  @Field(() => User)
  user: User;
}
