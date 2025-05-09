import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { isEqual } from 'lodash';
import { mailService } from 'src/lib/mail.service';
import { RefreshTokenDto } from 'src/modules/auth/dto/refresh-token.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { SendVerificationEmailDto } from 'src/modules/auth/dto/verify-code';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { getResetPasswordTemplate } from 'src/templates/emailTemplate';
import { getVerificationEmailTemplate } from 'src/templates/sendVerificationEmailtemplate';

@Injectable()
export class AuthService {
  private static readonly CODE_LENGTH = 6;
  private static readonly EXPIRATION_MINUTES = 5;
  private static readonly DEFAULT_ROLE = 'USER';
  private static readonly BCRYPT_SALT_ROUNDS = 10;
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  private generateVerificationCode(): { code: string; expiresAt: Date } {
    const code = Array.from({ length: AuthService.CODE_LENGTH }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() + AuthService.EXPIRATION_MINUTES,
    );
    return { code, expiresAt };
  }

  // Gửi email xác thực
  async sendVerificationEmail({
    email,
    verificationCode,
  }: SendVerificationEmailDto) {
    const htmlTemplate = getVerificationEmailTemplate(verificationCode);
    await mailService.sendMail({
      to: email,
      html: htmlTemplate,
      subject: 'Xác nhận đăng ký tài khoản',
    });
  }

  async register(userData: RegisterDto): Promise<any> {
    await this.validateRegistration(userData);
    const hashedPassword = await hash(
      userData.password,
      AuthService.BCRYPT_SALT_ROUNDS,
    );
    const verificationData = this.generateVerificationCode();
    const defaultRole = await this.getDefaultRole();

    await this.createUnverifiedUser(
      userData,
      hashedPassword,
      verificationData,
      defaultRole.id,
    );
    await this.sendVerificationEmail({
      email: userData.email,
      verificationCode: verificationData.code,
    });
    return { message: 'Vui lòng kiểm tra email để xác nhận đăng ký' };
  }

  private async validateRegistration(userData: RegisterDto): Promise<void> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new HttpException(
        { message: 'Email đã được sử dụng' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isEqual(userData.password, userData.confirmPassword)) {
      throw new HttpException(
        { message: 'Mật khẩu không khớp' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async getDefaultRole() {
    const defaultRole = await this.prismaService.role.findUnique({
      where: { name: AuthService.DEFAULT_ROLE },
    });

    if (!defaultRole) {
      throw new HttpException(
        { message: 'Không tìm thấy vai trò mặc định' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return defaultRole;
  }

  private async createUnverifiedUser(
    userData: RegisterDto,
    hashedPassword: string,
    verificationData: { code: string; expiresAt: Date },
    roleId: string,
  ): Promise<void> {
    await this.prismaService.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        name: userData.name,
        verificationCode: verificationData.code,
        verificationCodeExpiresAt: verificationData.expiresAt,
        isVerified: false,
        role: {
          connect: { id: roleId },
        },
      },
    });
  }

  // Xác thực mã xác nhận
  async verifyEmail(email: string, code: string): Promise<{ message: string }> {
    const user = await this.findUserForVerification(email);
    await this.validateVerificationCode(user, code);
    await this.markUserAsVerified(email);
    return { message: 'Đăng ký thành công!' };
  }

  private async findUserForVerification(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException(
        { message: 'Người dùng không tồn tại' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.isVerified) {
      throw new HttpException(
        { message: 'Người dùng đã xác thực' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  private async validateVerificationCode(user: User, code: string) {
    if (!isEqual(user.verificationCode, code)) {
      throw new HttpException(
        { message: 'Mã xác thực không đúng' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (new Date() > user.verificationCodeExpiresAt) {
      throw new HttpException(
        { message: 'Mã xác thực đã hết hạn' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async markUserAsVerified(email: string) {
    await this.prismaService.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationCodeExpiresAt: null,
      },
    });
  }

  async login(credentials: { email: string; password: string }): Promise<any> {
    const user = await this.findAndValidateUser(credentials);
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: this.formatUserResponse(user),
    };
  }

  private async findAndValidateUser(credentials: {
    email: string;
    password: string;
  }) {
    const user = await this.prismaService.user.findUnique({
      where: { email: credentials.email },
      include: { role: true },
    });

    if (!user) {
      throw new HttpException(
        { message: 'Account not found' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user.isVerified) {
      throw new HttpException(
        { message: 'Account is not verified' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user.role) {
      throw new HttpException(
        { message: 'User role not assigned' },
        HttpStatus.FORBIDDEN,
      );
    }

    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        { message: 'Password is not correct' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  private async generateTokens(user: any) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }

  private formatUserResponse(user: any) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
    };
  }

  createToken = async (id: string): Promise<string> => {
    if (!process.env.ACCESS_TOKEN_KEY) {
      throw new Error(
        'Access token secret key not found in environment variables.',
      );
    }

    return this.jwtService.sign(
      { id },
      {
        expiresIn: '7d',
        secret: process.env.ACCESS_TOKEN_KEY,
      },
    );
  };

  async forgotPassword(data: { email: string }) {
    const user = await this.findUserByEmail(data.email);
    const access_token = await this.createToken(user.id);
    await this.sendResetPasswordEmail(data.email, access_token);

    return {
      message: 'Password reset instructions have been sent to your email.',
    };
  }

  private async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        { message: `Email ${email} not found` },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  private async sendResetPasswordEmail(email: string, access_token: string) {
    const htmlTemplate = getResetPasswordTemplate(access_token);
    await mailService.sendMail({
      to: email,
      html: htmlTemplate,
      subject: 'Reset password',
    });
  }

  async resetPassword(
    user: User,
    newPassword: string,
  ): Promise<{ message: string }> {
    const userRecord = await this.getUserPassword(user.id);
    await this.validateNewPassword(newPassword, userRecord.password);
    await this.updateUserPassword(user.id, newPassword);

    return { message: 'Password reset successfully' };
  }

  private async getUserPassword(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user?.password) {
      throw new HttpException(
        { message: 'User password is missing' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  private async validateNewPassword(
    newPassword: string,
    currentPassword: string,
  ) {
    const isSamePassword = await compare(newPassword, currentPassword);
    if (isSamePassword) {
      throw new HttpException(
        { message: 'New password cannot be the same as the old password' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async updateUserPassword(userId: string, newPassword: string) {
    const hashedPassword = await hash(newPassword, 10);
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        confirmPassword: hashedPassword,
      },
    });
  }

  async changePassword(
    user: User,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<{ message: string }> {
    const userRecord = await this.getUserPassword(user.id);
    await this.validateCurrentPassword(currentPassword, userRecord.password);
    await this.validatePasswordChange(
      currentPassword,
      newPassword,
      confirmPassword,
    );
    await this.updateUserPassword(user.id, newPassword);

    return { message: 'Password changed successfully' };
  }

  private async validateCurrentPassword(
    currentPassword: string,
    storedPassword: string,
  ): Promise<void> {
    const isCurrentPasswordCorrect = await compare(
      currentPassword,
      storedPassword,
    );
    if (!isCurrentPasswordCorrect) {
      throw new HttpException(
        { message: 'Current password is incorrect' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async validatePasswordChange(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    if (isEqual(currentPassword, newPassword)) {
      throw new HttpException(
        { message: 'New password cannot be the same as the current password' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isEqual(newPassword, confirmPassword)) {
      throw new HttpException(
        { message: 'New password and confirm password do not match' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // log out

  async logout(refreshToken: string): Promise<{ message: string }> {
    if (!refreshToken) {
      throw new HttpException(
        { message: 'Refresh token là bắt buộc' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = await this.validateRefreshToken(refreshToken);
    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.blacklistToken(refreshToken);

    return { message: 'Đăng xuất thành công' };
  }

  private async blacklistToken(refreshToken: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const expiresAt = new Date(decoded.exp * 1000);

      await this.prismaService.blacklistedToken.create({
        data: {
          token: refreshToken,
          expiresAt,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Không thể xóa token' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async validateRefreshToken(token: string): Promise<any> {
    try {
      const blacklisted = await this.prismaService.blacklistedToken.findUnique({
        where: { token },
      });

      if (blacklisted) {
        throw new UnauthorizedException('Token đã bị hủy bỏ');
      }

      const decoded = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ access_token: string }> {
    const payload = await this.validateRefreshToken(
      refreshTokenDto.refresh_token,
    );
    if (!payload) {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    const user = await this.userService.getDetail(payload.id);
    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại');
    }

    const access_token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.roleId,
      },
      {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: '1d',
      },
    );

    return { access_token };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new HttpException(
        { message: `Email ${email} không tồn tại` },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (user.isVerified) {
      throw new HttpException(
        { message: 'Email đã được xác thực' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const verificationData = this.generateVerificationCode();
    await this.sendVerificationEmail({
      email: user.email,
      verificationCode: verificationData.code,
    });

    return { message: 'Email xác thực đã được gửi lại' };
  }
}
