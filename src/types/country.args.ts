import { Field, ArgsType } from "type-graphql";
import { MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateCountry {
  @Field()
  @MinLength(2)
  code!: string;

  @Field()
  @MinLength(2)
  name!: string;

  @Field()
  @MinLength(2)
  emoji!: string;

  @Field()
  @MinLength(2)
  continentCode!: string;
}
