import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { PrismaService } from '@app/src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, PrismaService, JwtService],
})
export class ExpensesModule {}
