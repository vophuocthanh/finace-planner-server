import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { PrismaService } from '@app/src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BudgetsController],
  providers: [BudgetsService, PrismaService, JwtService],
})
export class BudgetsModule {}
