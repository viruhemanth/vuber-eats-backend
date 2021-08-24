import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { CommonEntity } from '../../common/entities/common.entity';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CommonEntity {
  @Column()
  @Field(() => String)
  code: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuid4();
  }
}
