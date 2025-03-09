import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ApiCommonResponses } from 'src/decorator/api-common-responses.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { CurrentUser } from 'src/modules/auth/decorator/current-user.decorator';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from 'src/modules/auth/dto/auth.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RefreshTokenDto } from 'src/modules/auth/dto/refresh-token.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { VerifyEmailDto } from 'src/modules/auth/dto/verify-code';
import { HandleAuthGuard } from 'src/modules/auth/guard/auth.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiCommonResponses('Đăng ký tài khoản')
  register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body);
  }

  @ApiCommonResponses('Xác thực email')
  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(
      verifyEmailDto.email,
      verifyEmailDto.verificationCode,
    );
  }

  @Post('login')
  @ApiCommonResponses('Đăng nhập')
  login(@Body() body: LoginDto): Promise<User> {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  @ApiCommonResponses('Lấy lại token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('forgot-password')
  @ApiCommonResponses('Quên mật khẩu')
  forgotPassword(@Body() body: ForgotPasswordDto): Promise<any> {
    return this.authService.forgotPassword(body);
  }

  @UseGuards(HandleAuthGuard)
  @Put('reset-password')
  @ApiCommonResponses('Reset mật khẩu')
  async resetPassword(
    @CurrentUser() user: User,
    @Body() body: ResetPasswordDto,
  ): Promise<any> {
    const { newPassword } = body;
    return this.authService.resetPassword(user, newPassword);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Thay đổi mật khẩu')
  @Put('change-password')
  async changePassword(
    @CurrentUser() user: User,
    @Body() body: ChangePasswordDto,
  ): Promise<any> {
    const { current_password, password, confirm_password } = body;
    return this.authService.changePassword(
      user,
      current_password,
      password,
      confirm_password,
    );
  }
}
