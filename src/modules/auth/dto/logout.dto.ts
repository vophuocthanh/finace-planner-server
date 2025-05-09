import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    description: 'Refresh token',
    example: 'refresh_token',
  })
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
