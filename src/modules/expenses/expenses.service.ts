import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}
}
