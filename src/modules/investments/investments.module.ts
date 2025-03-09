import { Module } from '@nestjs/common';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';
import { PrismaService } from '@app/src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InvestmentsController],
  providers: [InvestmentsService, PrismaService, JwtService],
})
export class InvestmentsModule {}
