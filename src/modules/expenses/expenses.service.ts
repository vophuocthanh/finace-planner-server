import { PaginationParams } from '@app/src/core/model/pagination-params';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import {
  CreateExpensesDto,
  UpdateExpensesDto,
} from '@app/src/modules/expenses/dto/create-expenses.dto';
import { ExpensesResponse } from '@app/src/modules/expenses/dto/expenses.dto';
import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll(
    @Pagination() pagination: PaginationParams,
    userId: string,
  ): Promise<ExpensesResponse> {
    const { itemsPerPage, skip, search, page } = pagination;

    const whereAndWhere = {
      AND: [
        {
          description: {
            contains: search,
          },
        },
        {
          userId,
        },
      ],
    };

    const expenses = await this.prismaService.expense.findMany({
      where: whereAndWhere,
      include: {
        category: true,
        monthly: {
          select: {
            nameMonth: true,
            yearly: true,
          },
        },
      },
      skip,
      take: itemsPerPage,
      orderBy: {
        createAt: 'desc',
      },
    });

    const total = await this.prismaService.expense.count({
      where: whereAndWhere,
    });

    return {
      data: expenses,
      total,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  }

  async getexpensesByMonth(
    userId: string,
    monthlyId: string,
  ): Promise<ExpensesResponse> {
    const expenses = await this.prismaService.expense.findMany({
      where: {
        userId,
        monthlyId,
      },
      orderBy: {
        createAt: 'desc',
      },
    });

    const total = await this.prismaService.expense.count({
      where: {
        userId,
        monthlyId,
      },
    });

    return {
      data: expenses,
      total,
      currentPage: 1,
      itemsPerPage: total,
    };
  }

  async getById(id: string) {
    return this.prismaService.expense.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreateExpensesDto, userId: string) {
    const { monthlyId, amount, description, categoryId } = data;

    const newExpense = await this.prismaService.expense.create({
      data: { monthlyId, amount, description, categoryId, userId },
    });

    return newExpense;
  }

  async update(id: string, data: UpdateExpensesDto) {
    return this.prismaService.expense.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.prismaService.expense.delete({
      where: { id },
    });
    return { message: 'Expense deleted successfully' };
  }

  async getTotalExpensesByMonth(userId: string, monthlyId: string) {
    const total = await this.prismaService.expense.aggregate({
      where: { userId, monthlyId },
      _sum: { amount: true },
    });
    return {
      data: {
        total: total._sum.amount,
      },
    };
  }

  async getExpensesByMonth(userId: string, monthlyId: string) {
    const expenses = await this.prismaService.expense.findMany({
      where: { userId, monthlyId },
      orderBy: {
        createAt: 'desc',
      },
    });

    const total = await this.prismaService.expense.count({
      where: { userId, monthlyId },
    });

    return {
      data: expenses,
      total,
      currentPage: 1,
      itemsPerPage: total,
    };
  }
}
