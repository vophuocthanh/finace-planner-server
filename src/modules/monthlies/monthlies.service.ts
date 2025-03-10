import { PaginationParams } from '@app/src/core/model/pagination-params';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import {
  CreateMothilesDto,
  UpdateMothilesDto,
} from '@app/src/modules/monthlies/dto/create-monthlies.dto';
import { MonthliesPaginationResponse } from '@app/src/modules/monthlies/dto/monthlies.dto';
import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MonthliesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    @Pagination() pagination: PaginationParams,
  ): Promise<MonthliesPaginationResponse> {
    const { itemsPerPage, skip, search, page } = pagination;

    const monthlys = await this.prismaService.monthly.findMany({
      where: {
        nameMonth: {
          contains: search,
        },
      },
      skip,
      take: itemsPerPage,
    });

    const total = await this.prismaService.monthly.count({
      where: {
        nameMonth: {
          contains: search,
        },
      },
    });
    return {
      data: monthlys,
      total,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  }

  async getById(id: string) {
    return this.prismaService.monthly.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreateMothilesDto, userId: string) {
    return this.prismaService.monthly.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateMothilesDto) {
    return this.prismaService.monthly.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.monthly.delete({
      where: {
        id,
      },
    });
  }
}
