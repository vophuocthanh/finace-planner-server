import { PaginationParams } from '@app/src/core/model/pagination-params';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { mailService } from '@app/src/lib/mail.service';
import {
  CreatePersonIncomeDto,
  UpdatePersonIncomeDto,
} from '@app/src/modules/personal-incomes/dto/create-person-incomes.dto';
import { PersonIncomesResponse } from '@app/src/modules/personal-incomes/dto/person-incomes.dto';
import { PrismaService } from '@app/src/prisma.service';
import { newIncomeEmailTemplate } from '@app/src/templates/emailSendPersonIncome';
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
      include: {
        category: true,
        monthly: {
          select: {
            id: true,
            nameMonth: true,
            yearly: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
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

    const newIncome = await this.prismaService.personalIncome.create({
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
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        monthly: {
          select: {
            nameMonth: true,
            yearly: true,
          },
        },
      },
    });

    const category = await this.prismaService.category.findFirst({
      where: { id: categoryId },
    });

    await mailService.sendMail({
      to: newIncome.user.email,
      subject: '🎉 Thu nhập cá nhân mới đã được ghi nhận thành công!',
      html: newIncomeEmailTemplate(
        newIncome.user.name,
        newIncome.user.email,
        amount,
        newIncome.description,
        category.name,
        newIncome.monthly.nameMonth,
        'thu nhập',
      ),
    });
    return newIncome;
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
