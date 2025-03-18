import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpensesDto {
  @ApiProperty({
    description: 'Tên chi tiêu',
    example: 'Mua đồ ăn',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Số tiền chi tiêu',
    example: 100000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Mã danh mục chi tiêu',
  })
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'Mã tháng',
  })
  @IsNotEmpty()
  @IsString()
  monthlyId: string;
}

export class UpdateExpensesDto extends PartialType(CreateExpensesDto) {}
