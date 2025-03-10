import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMothilesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameMonth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  yearId: string;
}

export class UpdateMothilesDto extends CreateMothilesDto {}
