import { CategoryType } from '@app/src/enums/categories-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class CreateCategoriesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: CategoryType })
  @IsEnum(CategoryType)
  type: CategoryType;
}
