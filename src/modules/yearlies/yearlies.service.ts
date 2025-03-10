import { PaginationParams } from '@app/src/core/model/pagination-params';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import {
  CreateYearliesDto,
  UpdateYearliesDto,
} from '@app/src/modules/yearlies/dto/create-yearlies.dto';
import { YearliesPaginationResponse } from '@app/src/modules/yearlies/dto/yearlies.dto';
import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class YearliesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    @Pagination() pagination: PaginationParams,
  ): Promise<YearliesPaginationResponse> {
    const { itemsPerPage, skip, page } = pagination;

    const yearlies = await this.prismaService.yearly.findMany({
      skip,
      take: itemsPerPage,
    });

    const total = await this.prismaService.yearly.count();

    return {
      data: yearlies,
      currentPage: page,
      itemsPerPage: itemsPerPage,
      total,
    };
  }

  async getById(id: string) {
    return this.prismaService.yearly.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreateYearliesDto, userId: string) {
    return this.prismaService.yearly.create({
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

  async update(id: string, data: UpdateYearliesDto) {
    return this.prismaService.yearly.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.yearly.delete({
      where: {
        id,
      },
    });
  }
}
