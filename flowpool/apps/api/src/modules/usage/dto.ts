import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateUsageDto {
  @IsOptional()
  @IsString()
  sourceName?: string;

  @IsNumber()
  @Min(1)
  units!: number;

  @IsNumber()
  @Min(0.01)
  unitCost!: number;
}
