import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSavingsDto {
  @ApiProperty({
    description: 'ID của tháng',
  })
  @IsNotEmpty()
  @IsString()
  monthlyId: string;

  @ApiProperty({
    description: 'Số tiền tiết kiệm',
    example: 1000000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Mô tả',
    example: 'Tiết kiệm cho việc du lịch',
  })
  @IsString()
  goal: string;
}

export class UpdateSavingsDto extends PartialType(CreateSavingsDto) {}
