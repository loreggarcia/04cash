import { IsArray, IsIn, IsNumber, IsString, Min } from "class-validator";

export class CreateAgentDto {
  @IsString()
  name!: string;
  @IsNumber()
  @Min(1)
  maxBudget!: number;
  @IsString()
  @IsIn(["low", "medium", "high"])
  priority!: "low" | "medium" | "high";
  @IsArray()
  permissions!: string[];
}

export class UpdateBudgetDto {
  @IsNumber()
  @Min(1)
  amount!: number;
}

export class RunAgentTaskDto {
  @IsString()
  taskType!: string;
  @IsNumber()
  @Min(0.01)
  cost!: number;
}
