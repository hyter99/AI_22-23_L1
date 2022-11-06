import { IsInt, IsNotEmpty, Min } from "class-validator";

export class AddWalletDto {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  amountCents!: number;
}