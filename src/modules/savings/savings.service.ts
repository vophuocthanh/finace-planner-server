import { PaginationParams } from '@app/src/core/model/pagination-params';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import {
  CreateSavingsDto,
  UpdateSavingsDto,
} from '@app/src/modules/savings/dto/create-savings.dto';
import { SavingsResponse } from '@app/src/modules/savings/dto/savings.dto';
import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SavingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    @Pagination() pagination: PaginationParams,
    userId: string,
  ): Promise<SavingsResponse> {
    const { itemsPerPage, skip, search, page } = pagination;

    const whereAndWhere = {
      AND: [
        {
          goal: {
            contains: search,
          },
        },
        {
          userId,
        },
      ],
    };

    const savings = await this.prismaService.saving.findMany({
      where: whereAndWhere,
      skip,
      take: itemsPerPage,
      orderBy: {
        createAt: 'desc',
      },
    });

    const total = await this.prismaService.saving.count({
      where: whereAndWhere,
    });

    return {
      data: savings,
      total,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  }

  async getSavingsByMonth(
    userId: string,
    monthlyId: string,
  ): Promise<SavingsResponse> {
    const savings = await this.prismaService.saving.findMany({
      where: {
        userId,
        monthlyId,
      },
      orderBy: {
        createAt: 'desc',
      },
    });

    const total = await this.prismaService.saving.count({
      where: {
        userId,
        monthlyId,
      },
    });

    return {
      data: savings,
      total,
      currentPage: 1,
      itemsPerPage: total,
    };
  }

  async getById(id: string) {
    return this.prismaService.saving.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreateSavingsDto, userId: string) {
    const { monthlyId, amount, goal } = data;
    return this.prismaService.saving.create({
      data: {
        amount,
        goal,
        user: {
          connect: {
            id: userId,
          },
        },
        monthly: {
          connect: {
            id: monthlyId,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateSavingsDto) {
    const { monthlyId, amount, goal } = data;
    return this.prismaService.saving.update({
      where: { id },
      data: { monthlyId, amount, goal },
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.prismaService.saving.delete({
      where: { id },
    });
    return { message: 'Saving deleted successfully' };
  }

  async getTotalSavingsByMonth(userId: string, monthlyId: string) {
    const total = await this.prismaService.saving.aggregate({
      where: { userId, monthlyId },
      _sum: { amount: true },
    });
    return {
      data: {
        total: total._sum.amount,
      },
    };
  }
}
