import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Địa chỉ email cần xác thực',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mã xác thực được gửi qua email',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  verificationCode: string;
}

export interface SendVerificationEmailDto {
  email: string;
  verificationCode: string;
}
