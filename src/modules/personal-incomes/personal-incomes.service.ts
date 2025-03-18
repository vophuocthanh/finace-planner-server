import { PaginationParams } from '@app/src/core/model/pagination-params';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { PersonIncomesResponse } from '@app/src/modules/personal-incomes/dto/person-incomes.dto';
import {
  CreatePersonIncomeDto,
  UpdatePersonIncomeDto,
} from '@app/src/modules/personal-incomes/dto/create-person-incomes.dto';
import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonalIncomesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    @Pagination() pagination: PaginationParams,
    userId: string,
  ): Promise<PersonIncomesResponse> {
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

    const personIncomes = await this.prismaService.personalIncome.findMany({
      where: whereAndWhere,
      skip,
      take: itemsPerPage,
      orderBy: {
        createAt: 'desc',
      },
    });

    const total = await this.prismaService.personalIncome.count({
      where: whereAndWhere,
    });

    return {
      data: personIncomes,
      total,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  }

  async getById(id: string) {
    return this.prismaService.personalIncome.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreatePersonIncomeDto, userId: string) {
    const { categoryId, monthlyId, amount, description } = data;
    return this.prismaService.personalIncome.create({
      data: {
        amount,
        description,
        category: {
          connect: {
            id: categoryId,
          },
        },
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

  async update(id: string, data: UpdatePersonIncomeDto) {
    return this.prismaService.personalIncome.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.prismaService.personalIncome.delete({
      where: { id },
    });
    return { message: 'Personal income deleted successfully' };
  }
}
