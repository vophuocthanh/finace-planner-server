import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MonthliesService {
  constructor(private readonly prismaService: PrismaService) {}
}
