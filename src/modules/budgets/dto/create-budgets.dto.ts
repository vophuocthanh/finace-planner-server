import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBudgetsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  monthlyId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  limitAmount: number;
}

export class UpdateBudgetsDto extends CreateBudgetsDto {}
