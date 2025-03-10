import { Module } from '@nestjs/common';
import { YearliesController } from './yearlies.controller';
import { YearliesService } from './yearlies.service';
import { PrismaService } from '@app/src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [YearliesController],
  providers: [YearliesService, PrismaService, JwtService],
})
export class YearliesModule {}
