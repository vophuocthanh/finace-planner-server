import { Module } from '@nestjs/common';
import { MonthliesController } from './monthlies.controller';
import { MonthliesService } from './monthlies.service';
import { PrismaService } from '@app/src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MonthliesController],
  providers: [MonthliesService, PrismaService, JwtService],
})
export class MonthliesModule {}
