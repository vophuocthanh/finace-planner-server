import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateYearliesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  year: number;
}

export class UpdateYearliesDto extends CreateYearliesDto {}
