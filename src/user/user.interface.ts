// Custom providers

import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class UserInter {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}