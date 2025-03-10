import { PaginationParams } from '@app/src/core/model/pagination-params';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { BudgetsPaginationResponse } from '@app/src/modules/budgets/dto/budgets.dto';
import {
  CreateBudgetsDto,
  UpdateBudgetsDto,
} from '@app/src/modules/budgets/dto/create-budgets.dto';
import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BudgetsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    @Pagination() pagination: PaginationParams,
  ): Promise<BudgetsPaginationResponse> {
    const { itemsPerPage, skip, search, page } = pagination;

    const budgets = await this.prismaService.budget.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip,
      take: itemsPerPage,
    });

    const total = await this.prismaService.budget.count({
      where: {
        name: {
          contains: search,
        },
      },
    });
    return {
      data: budgets,
      total,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  }

  async getById(id: string) {
    return this.prismaService.budget.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreateBudgetsDto, userId: string) {
    return this.prismaService.budget.create({
      data: {
        name: data.name,
        limitAmount: data.limitAmount,
        monthly: {
          connect: {
            id: data.monthlyId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateBudgetsDto) {
    return this.prismaService.budget.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.budget.delete({
      where: {
        id,
      },
    });
  }
}
