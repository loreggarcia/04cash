import { IsIn, IsString } from "class-validator";

export class UpdatePoolPolicyDto {
  @IsString()
  @IsIn(["conservative", "balanced", "aggressive"])
  policyMode!: "conservative" | "balanced" | "aggressive";
}
