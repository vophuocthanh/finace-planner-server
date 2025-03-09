import { Module } from '@nestjs/common';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';
import { PrismaService } from '@app/src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SavingsController],
  providers: [SavingsService, PrismaService, JwtService],
})
export class SavingsModule {}
