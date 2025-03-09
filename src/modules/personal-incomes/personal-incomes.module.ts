import { Module } from '@nestjs/common';
import { PersonalIncomesController } from './personal-incomes.controller';
import { PersonalIncomesService } from './personal-incomes.service';
import { PrismaService } from '@app/src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PersonalIncomesController],
  providers: [PersonalIncomesService, PrismaService, JwtService],
})
export class PersonalIncomesModule {}
